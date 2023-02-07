import { Customer, Customers } from "../../src/models/Customer";
import {
  ArrayRepository,
  getUserStorage,
  MongoRepository,
} from "../../src/repository/CustomerRepository";
import { clearDatabase, closeDatabase, connect } from "./dbconnection";

describe("#given storage array", () => {
  afterEach(() => {
    getUserStorage().splice(0, getUserStorage().length);
  });

  const arrayRepo = new ArrayRepository();
  const newCustomer = new Customer({
    id: 1,
    firstName: "Tom",
    lastName: "Hardy",
  });

  it("should add a new user", () => {
    //given
    //when
    arrayRepo.create(newCustomer);
    //then
    expect(getUserStorage().at(-1)).toMatchObject(newCustomer);
  });

  test("should delete a new user", () => {
    //given
    arrayRepo.create(newCustomer);
    //when
    arrayRepo.delete(1);
    //then
    expect(getUserStorage()).toHaveLength(0);
  });

  it("should not delete any user if array is empty", () => {
    //given
    console.log = jest.fn();
    //when
    arrayRepo.delete(1);
    //then
    expect(console.log).toHaveBeenCalledWith(
      "There are no users in the database"
    );
  });

  it("should get all users from array", () => {
    //given
    arrayRepo.create(newCustomer);
    //when
    const customers = arrayRepo.getCustomers();
    //then
    expect(customers).toEqual([newCustomer]);
  });

  it("should get a user by id", () => {
    //given
    arrayRepo.create(newCustomer);
    //when
    const customer = arrayRepo.getCustomerByID(1);
    //then
    expect(customer).toEqual(newCustomer);
  });

  it("should find existing user(s) by first name", () => {
    //given
    arrayRepo.create(newCustomer);
    //when
    const searchResults = arrayRepo.searchByName("Tom");
    //then
    expect(searchResults).toContainEqual(newCustomer);
  });

  it("should find existing user(s) by last name", () => {
    //given
    arrayRepo.create(newCustomer);
    //when
    const searchResults = arrayRepo.searchByName("Hardy");
    //then
    expect(searchResults).toContainEqual(newCustomer);
  });

  it("should update details", () => {
    //given
    arrayRepo.create(newCustomer);
    //when
    const updateCustomer = new Customer({
      id: 1,
      firstName: "David",
      lastName: "Beckham",
    });
    arrayRepo.update(updateCustomer);
    //then
    expect(getUserStorage()).toContainEqual(
      new Customer({ id: 1, firstName: "David", lastName: "Beckham" })
    );
  });
});

describe("#given mongo database", () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  const mongoRepo = new MongoRepository();
  const newCustomer = new Customer({
    id: 1,
    firstName: "Tom",
    lastName: "Hardy",
  });
  const newCustomer2 = new Customer({
    id: 2,
    firstName: "Tom",
    lastName: "Holland",
  });

  it("should add a new user to Customer collection", async () => {
    //given
    //when
    await mongoRepo.create(newCustomer);
    //then
    const savedCustomer = await Customers.findOne({ id: 1 });
    expect(savedCustomer).toMatchObject(newCustomer);
  });

  it("should throw error when adding a user that already exists in collection", async () => {
    //given
    await mongoRepo.create(newCustomer);
    const customerWithExistingID = new Customer({
      id: 1,
      firstName: "David",
      lastName: "Beckham",
    });
    //when
    //then
    await expect(
      mongoRepo.create(customerWithExistingID)
    ).rejects.toThrowError();
    await expect(mongoRepo.create(customerWithExistingID)).rejects.toThrow(
      "A customer with id: 1 already exists"
    );
  });

  test("should delete a customer from Customer collection", async () => {
    //given
    await mongoRepo.create(newCustomer);
    //when
    await mongoRepo.delete(1);
    //then
    const deletedCustomer = await Customers.findOne({ id: 1 });
    expect(deletedCustomer).toBeNull();
  });

  it("should get all users", async () => {
    //given
    await mongoRepo.create(newCustomer);
    await mongoRepo.create(newCustomer2);
    //when
    const customers = await mongoRepo.getCustomers();
    //then
    expect(customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newCustomer),
        expect.objectContaining(newCustomer2),
      ])
    );
  });

  it("should get a user by id", async () => {
    //given
    await mongoRepo.create(newCustomer);
    await mongoRepo.create(newCustomer2);
    //when
    const customer = await mongoRepo.getCustomerByID(2);
    //then
    expect(customer).toEqual(expect.objectContaining(newCustomer2));
  });

  it("should find existing user(s) by first name", async () => {
    //given
    await mongoRepo.create(newCustomer);
    //when
    const filteredList = await mongoRepo.searchByName("Tom");
    //then
    expect(filteredList).toEqual(
      expect.arrayContaining([expect.objectContaining(newCustomer)])
    );
  });

  test("should find existing user(s) by last name", async () => {
    //given
    await mongoRepo.create(newCustomer);
    //when
    const filteredList = await mongoRepo.searchByName("Hardy");
    //then
    expect(filteredList).toEqual(
      expect.arrayContaining([expect.objectContaining(newCustomer)])
    );
  });

  it("should update details", async () => {
    //given
    await mongoRepo.create(newCustomer);
    //when
    const updateCustomer = new Customer({
      id: 1,
      firstName: "David",
      lastName: "Beckham",
    });
    await mongoRepo.update(updateCustomer);
    //then
    const updatedCustomer = await Customers.findOne({ id: 1 });
    expect(updatedCustomer).toMatchObject(updateCustomer);
  });
});
