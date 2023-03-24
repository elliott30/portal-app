import Layout from "../components/layouts"

export default function MePage() {

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">About this project</p>
        </div>
      </section>

      <section className="section content">
        <p>This project</p>
        <h3>Built with</h3>
        <ul>
          <li>Next.js</li>
          <li>NextAuth - Login with HubSpot oAuth</li>
          <li>Firebase - Store oAuth access and refresh token, session, and project details</li>
          <li>Bulma - CSS Styling</li>
          <li>Vercel - Hosting</li>
          <li>React</li>
          <li>Axios</li>
        </ul>


      </section>
    </Layout>
  )
}