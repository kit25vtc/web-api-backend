import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../main";
import * as dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

const NewUser = {
  username: "user001",
  email: "user001@user.com",
  password: "QWE123qwe",
  role: "user",
};

describe("POST /api/v1/auth/sign_up", () => {
  it("should register an user", async () => {
    const res = await request(app).post("/api/v1/auth/sign_up").send(NewUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
  });
});

describe("POST /api/v1/auth/sign_up", () => {
  it("should return error message: user exist", async () => {
    const res = await request(app).post("/api/v1/auth/sign_up").send(NewUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual("User exist");
  });
});

describe("POST /api/v1/auth/sign_in", () => {
  it("user login", async () => {
    const res = await request(app).post("/api/v1/auth/sign_in").send({
      email: NewUser.email,
      password: NewUser.password,
    });
    expect(res.statusCode).toBe(200);
  });
});

const newStaff = {
  email: "staff01@staff.com",
  password: "QWE123qwe",
  role: "staff",
  staffCode: "staff",
};

describe("POST /api/v1/auth/sign_up", () => {
  it("should sign up a new staff", async () => {
    const res = await request(app).post("/api/v1/auth/sign_up").send(newStaff);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
  });
});

describe("POST /api/v1/auth/sign_in", () => {
  it("staff login", async () => {
    const res = await request(app).post("/api/v1/auth/sign_in").send({
      email: newStaff.email,
      password: newStaff.password,
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/v1/dogs", () => {
  it("should return all dogs records", async () => {
    const res = await request(app).get("/api/v1/dogs");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
  });
});

describe("POST /api/v1/dog", () => {
  it("should return unAuthentication user", async () => {
    const res = await request(app).post("/api/v1/dog").send({
      name: "dog name",
      age: "5",
      color: "white",
      description: "testing add dog",
    });
    expect(res.statusCode).toBe(401);
  });
});
