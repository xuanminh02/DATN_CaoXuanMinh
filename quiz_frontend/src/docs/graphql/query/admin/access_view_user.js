import { gql } from "@apollo/client";

const access_view_user = gql`
  query access_view_user($id_user: String, $point_day: String!) {
    access_view_user(id_user: $id_user, point_day: $point_day) {
      day1
      day2
      day3
      day4
      day5
      day6
      day7
    }
  }
`;

export default access_view_user;
