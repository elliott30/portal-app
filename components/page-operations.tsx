import { app, database } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function PageOperations() {

  const getPages = async () => {

    console.log("page-list | GetPages | START");

    const pageQuery = query(
      collection(database, "pages"),
      // where("email", "==", session!.user?.email)
    );
    // console.log("page-list | GetPages | userQuery | ", pageQuery);

    const querySnapshot = await getDocs(pageQuery);
    // console.log("page-list | GetPages | querySnapshot | ", querySnapshot);

    const pages = querySnapshot.docs.map(doc => doc.data())
    console.log("page-list | GetPages | pages | ", pages);

    if (!pages) {
      return "No pages found"
    }

    return pages;
  }






















  return (
    <>
      <div >
        <button
          className="button">
          Add a New Note
        </button>
      </div>
      <div className="">
        <input placeholder='Enter the Title..' />
      </div>
    </>
  )
}



  // Array of pages

/*
console.log("dashboard | get pages from firebase");

const pageQuery = query(
  collection(database, "pages"),
  where("id", "==", 56789)
);
const querySnapshot = await getDocs(pageQuery);
const pages = querySnapshot.docs.map(doc => doc.data())
console.log("dashboard | pages from firebase | ", pages);

if (!pages) {
  console.log("No pages found")
}

*/
