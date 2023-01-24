import mongoose, {Schema} from "mongoose";
export interface ICustomer{
  id: number;
  firstName: string;
  lastName: string;
}

class Customer implements ICustomer{
  id: number;
  firstName: string;
  lastName: string;

  constructor(customer: ICustomer){
    this.id = customer.id;
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
  }
}

const customerSchema = new Schema<ICustomer>({
  id: Number,
  firstName: String,
  lastName: String
});

const Customers = mongoose.model<ICustomer>('customers', customerSchema);

export {Customer, Customers}