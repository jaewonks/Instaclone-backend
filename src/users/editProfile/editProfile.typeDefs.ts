import { gql } from "apollo-server-core";

export default gql`
  type editProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      ) : editProfileResult!
  }
`