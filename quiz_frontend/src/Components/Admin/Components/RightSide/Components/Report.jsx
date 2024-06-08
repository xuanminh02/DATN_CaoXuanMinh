import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { useQuery } from "@apollo/client";
import report_new_member_last_7_days from "../../../../../docs/graphql/query/admin/report_new_member_last_7_days";
import { UserContext } from "../../../../../App";
import access_view_user from "../../../../../docs/graphql/query/admin/access_view_user";
import _ from "lodash";
import stat_user_learn_term from "../../../../../docs/graphql/query/admin/stat_user_learn_term";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Members of your all classes last 7 days",
      fontSize: 20,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false, //this will remove only the label
          },
        },
      ],
    },
  },
};
export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Access views of your all terms last 7 days",
      fontSize: 20,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false, //this will remove only the label
          },
        },
      ],
    },
  },
};
export const options3 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "New users learn your all terms last 7 days",
      fontSize: 20,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false, //this will remove only the label
          },
        },
      ],
    },
  },
};
const Report = () => {
  return (
    <>
      <Helmet>
        <title>Report | Quiz</title>
      </Helmet>
      <div className="fidfjksdsk" style={{ width: "50%" }}>
        <ClassMemberChart></ClassMemberChart>
        <br />
        <AccessViewTermChart></AccessViewTermChart>
        <br />
        <StatUserLearnTerm></StatUserLearnTerm>
      </div>
    </>
  );
};

const ClassMemberChart = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(report_new_member_last_7_days, {
    variables: {
      id_user: user?.uid || "",
      point_day: moment(new Date()).format("DD-MM-YYYY"),
    },
  });
  const labels = new Array(7)
    .fill(undefined)
    .map((val, index) =>
      moment(new Date()).subtract(parseInt(index), "days").format("DD/MM")
    )
    .reverse();

  // const labels2=
  if (data) {
    const dataChart = {
      labels,
      datasets: [
        {
          label: "New member",
          data:
            Object?.values(data?.report_new_member_last_7_days)
              ?.filter((item) => item !== "NewMember")
              ?.reverse() || [],
          backgroundColor: "#2e89ff",
        },
      ],
    };

    return (
      <div>
        <Bar options={options} data={dataChart}></Bar>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          There is {_.sum(Object.values(data?.report_new_member_last_7_days))}{" "}
          new member joined your classes last 7 days
        </div>
      </div>
    );
  }
  if (loading) return <div>Loading</div>;
  else return <div>Error</div>;
};

const AccessViewTermChart = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(access_view_user, {
    variables: {
      id_user: user?.uid,
      point_day: moment(new Date()).format("DD/MM/YYYY"),
    },
  });
  const labels = new Array(7)
    .fill(undefined)
    .map((val, index) =>
      moment(new Date()).subtract(parseInt(index), "days").format("DD/MM")
    )
    .reverse();

  // const labels2=
  if (data) {
    const dataChart = {
      labels,
      datasets: [
        {
          label: "Access times",
          data:
            Object?.values(data?.access_view_user)
              ?.filter((item) => item !== "AccessViewUser")
              ?.reverse() || [],
          backgroundColor: "#2e89ff",
        },
      ],
    };
    return (
      <div>
        <Bar options={options2} data={dataChart}></Bar>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          There are {_.sum(Object.values(data?.access_view_user))} accessed view
          your terms last 7 days
        </div>
      </div>
    );
  }
  if (loading) return <div>Loading</div>;
  else return <div>{error}</div>;
};

const StatUserLearnTerm = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(stat_user_learn_term, {
    variables: {
      own_id: user?.uid,
    },
  });
  const labels = new Array(7)
    .fill(undefined)
    .map((val, index) =>
      moment(new Date()).subtract(parseInt(index), "days").format("DD/MM")
    )
    .reverse();

  // const labels2=
  if (data) {
    const dataChart = {
      labels,
      datasets: [
        {
          label: "New users",
          data:
            Object?.values(data?.stat_user_learn_term)
              ?.filter((item) => item !== "stat_user_learn_term")
              ?.reverse() || [],
          backgroundColor: "#2e89ff",
        },
      ],
    };
    return (
      <div>
        <Bar options={options3} data={dataChart}></Bar>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          There are {_.sum(Object.values(data?.stat_user_learn_term))} new people
          learn your terms last 7 days
        </div>
      </div>
    );
  }
  if (loading) return <div>Loading</div>;
  else return <div>{error}</div>;
};

export default Report;
