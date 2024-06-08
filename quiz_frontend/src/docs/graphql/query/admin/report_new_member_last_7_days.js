import { gql } from "@apollo/client";

const report_new_member_last_7_days = gql`
  query report_new_member_last_7_days($id_user: String!, $point_day: String!) {
    report_new_member_last_7_days(id_user: $id_user, point_day: $point_day) {
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

export default report_new_member_last_7_days;
