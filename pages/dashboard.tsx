import { unstable_getServerSession } from "next-auth/next"

import axios from "axios";
import Layout from "../components/layouts";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define types

interface IProjectListProps {
  projectData: ProjectDataType;
}

type ProjectDataType = {
  projects: ProjectType[];
};

type ProjectType = {
  id: number;
  title: string;
  description?: string;
  url: string;
};

// Export function to display content

export default function IndexPage() {
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState("");


  let changeHandler = (event: any) => {
    setProject(event.target.value);
  };

  let removeProject = (rproject: any) => {
    setLoading(true);
    fetch("/api/projects/remove?project=" + rproject)
      .then((res) => res.json())
      .then((data) => {
        loadProjects();
      });
  };

  function handleErrors(response: any) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  let loadProjects = () => {
    console.log("load pages");

    function handleErrors(response: any) {
      if (!response.ok) {
        setLoading(false)
        setErr(response.statusText)
        console.log("Error response", response.statusText);
        throw Error(response.statusText);
      }
      return response;
    }

    fetch("/api/projects/load")
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.log(error));

  };

  useEffect(() => {
    setLoading(true);
    loadProjects();
  }, []);


  if (!data) return "Loading...";

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="columns is-vcentered">
            <div className="column">
              <p className="title">Dashboard</p>
              <p className="subtitle">Your Pages</p>
            </div>
            <div className="column">
              <div className="button is-pulled-right">
                <Link href="./create-page">Create page</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content section">
        <div className="columns is-multiline is-mobile">
          {loading && <h2>Loading</h2>}
          <>
            {err && <div className="notification is-danger is-light">{err}</div>}
          </>
          <>
            {data &&
              <>
                {
                  data.map((page: any) => (
                    <div className="column is-one-quarter" key={page.id}>
                      <div className="card">
                        <div className="card-content">
                          <p className="title">{page.title}</p>
                          <div className="content">{page.url}</div>
                        </div>
                        <footer className="card-footer">
                          <a href={page.url} className="card-footer-item">
                            View
                          </a>
                          <a href={page.url} className="card-footer-item">
                            Edit
                          </a>
                        </footer>
                      </div>
                    </div>
                  ))
                }
              </>
            }</>

        </div>
      </section>
    </Layout>
  );
}
