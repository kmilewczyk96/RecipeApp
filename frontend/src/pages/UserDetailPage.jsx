import {json} from "react-router-dom";

import ProfilePageLayout from "../components/layout/ProfilePageLayout.jsx";

import {getToken} from "../util/auth-token.js";


export default function UserDetailPage() {
  return (
    <ProfilePageLayout>
    </ProfilePageLayout>
  );
};
export async function userDetailLoader({request, params}){
  const userID = params["userID"] + "/";
  const response = await fetch("http://localhost:8000/api/user/users/" + userID, {
    method: "GET",
    headers: {
      "Authorization": "Token " + getToken()
    }
  });

  if (!response.ok) {
    throw json({message: "Something went wrong."}, {
      status: 404,
      statusText: "User does not exist."
    });
  }

  return response.json();
}
