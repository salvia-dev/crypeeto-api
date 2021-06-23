import axios from "axios";
import { UserModel } from "../Models/User.model";
import { WalletModel } from "../Models/Wallet.model";
import { getToken } from "../utils/utils";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import {
  generateEmail,
  generatePassword,
  generateUsername,
} from "../utils/utils";

chai.should();
chai.use(chaiHttp);

// Sample data
const sampleUsername = generateUsername();
const samplePassword = generatePassword();
const sampleEmail = generateEmail();

export const walletTests = () => {
  // Clear the database before the tests and login to get the accessToken
  before(async () => {
    const removal = await UserModel.deleteMany({});
    const register = await axios.post("http://localhost:3001/register", {
      username: sampleUsername,
      password: samplePassword,
      email: sampleEmail,
    });
  });

  // Test the [POST] /wallet/create route
  describe("[POST] /wallet/create", () => {
    it("it should add a new wallet to the database [200]", async () => {
      const token = await getToken(sampleUsername, samplePassword);

      const response = await chai
        .request(app)
        .post("/wallet/create")
        .set("Authorization", `Bearer ${token}`)
        .send({ currency: "Bitcoin" });

      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have
        .property("message")
        .eql("Your wallet has been successfully created");
    });

    // Clear the database after the tests
    after(async () => {
      const userRemoval = await UserModel.deleteMany({});
      const walletRemoval = await WalletModel.deleteMany({});
    });
  });
};