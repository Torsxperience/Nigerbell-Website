import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "../styles/about.css"

export default ({ data }) => {
  const specializations =
    data.fetchSpecializations.edges[0].node.childMarkdownRemark.frontmatter
      .specializations
  const aboutdata =
    data.fetchAboutPage.edges[0].node.childMarkdownRemark.frontmatter
  const body = data.fetchAboutPage.edges[0].node.childMarkdownRemark.html

  return (
    <Layout>
      <div className="about-container">
        <div
          className="about-jumbo"
          style={{
            backgroundImage: `linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.52),
      rgba(0, 0, 0, 0.73)
    ),
    url(${aboutdata.image})`,
          }}
        >
          <h1 className="about-jumbo-header">ABOUT US</h1>
          <div className="about-jumbo-profile">
            <img className="about-profile-img" src={aboutdata.authorimage} />
            <div className="about-profile-name">
              <p className="about-company-name">{aboutdata.author}</p>
              <p className="about-company-rep">{aboutdata.jobtitle}</p>
            </div>
          </div>
        </div>
        <div className="about-content">
          <h1 className="about-spec-header about-jumbo-header">
            INTRODUCTION
          </h1>
          <div
            className="about-content-text"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <br />
          <h1 className="about-spec-header about-jumbo-header">
            OUR SPECIALIZATION
          </h1>
          <div className="about-specializations">
            {specializations.map((i, key) => (
              <div key={key} className="box cardStyleII">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    fetchSpecializations: allFile(
      filter: {
        sourceInstanceName: { eq: "data" }
        name: { eq: "specializations" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              specializations
            }
          }
        }
      }
    }
    fetchAboutPage: allFile(
      filter: { sourceInstanceName: { eq: "data" }, name: { eq: "aboutpage" } }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              image
              author
              authorimage
              jobtitle
              title
            }
            html
          }
        }
      }
    }
  }
`
