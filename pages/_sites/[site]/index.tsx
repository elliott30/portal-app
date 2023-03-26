import Layout from "../../../components/sites/layout";
import Link from "next/link"
import Image from 'next/image'

import { useRouter } from "next/router";
// we will create these in the next step
import { getHostnameDataBySubdomain, getSubdomainPaths } from "../../../lib/db";

// Our types for the site data
export interface Props {
  name: String
  description: String
  subdomain: String
  customDomain: String
}

export default function Index(props: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <>
        <p>
          Loading...
        </p>
      </>
    )
  }

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="columns is-vcentered">
            <div className="column">
              <p className="title">Your Leads</p>
              <p className="subtitle">Register and track your leads</p>
            </div>
            <div className="column">
              <div className="button is-pulled-right">
                <Link href="./create-page">Register lead</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content section">
        <table className="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example Title</td>
              <td>Example URL</td>
              <td>
                <a href="example-url" className="button is-small is-link">
                  View
                </a>
                <a href="example-url" className="button is-small is-info">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>

      </section>
    </Layout>

  )
}

// Getting the paths for all the subdomains in our database
export async function getStaticPaths() {
  const paths = await getSubdomainPaths()

  return {
    paths,
    fallback: true
  }
}

// Getting data to display on each custom subdomain
export async function getStaticProps({ params: { site } }: any) {
  const sites = await getHostnameDataBySubdomain(site)

  return {
    props: sites,
    revalidate: 3600
  }
}