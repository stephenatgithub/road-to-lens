import { getClient } from "../../../apollo-client";
import fetchProfileQuery from "../../../queries/fetchProfileQuery.js";
import Profile from "../../../components/Profile.js";
import Post from "../../../components/Post.js";


export default async function ProfilePage({ params }) {

  console.log("fetching profile for", params.id);

  const { loading, error, data } = await getClient().query({
    query: fetchProfileQuery,
    variables: { 
      request: { profileId: params.id },
      publicationsRequest: {
        profileId: params.id,
        publicationTypes: ["POST"], // We really only want POSTs
      },
    },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return (
    <div className="flex flex-col p-8 items-center">
      <Profile profile={data.profile} displayFullProfile={true} />
      {data.publications.items.map((post, idx) => {
        return <Post key={idx} post={post}/>;
      })}
    </div>
  );
}

