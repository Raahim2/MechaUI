import '../CSS/home.css'


// src/pages/Home.js or wherever your file is located
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import '../CSS/home.css'; 
export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        navigate('/dashboard');
      } else {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [navigate]); // The effect depends on the navigate function

  if (loading) {
    return <div className="min-h-screen bg-[#030303]"></div>; 
  }

  

  

  return (
    <>
    <div className="navbar w-nav">
      <div className="container w-container">
        <div className="w-layout-grid grid-nav">
          <a href="/" className="brand w-nav-brand w--current">
            <img
              style={{'height':'40px'}}
              src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d8af8f263184dee28_logo-icon.svg"
              loading="lazy"
              alt="logo"
              className="lowgo"
            />
          </a>

          <nav role="navigation" className="nav-menu w-nav-menu">
          
          </nav>

          <div className="right-nav">
            <div className="nav-button-wrap">
              <a
                href="/login"
                className="button-arrow w-variant-004d8508-565d-37f9-39ad-0523bc228eff w-inline-block"
                data-wf--button-arrow--variant="button-arrow-white"
              >
                <div className="button-text">Get started</div>
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799a3da5e5e38693cf6d135_button-dark-arrow.svg"
                  loading="eager"
                  alt="icon"
                  className="button-icon"
                />
              </a>
            </div>

            <div className="menu-button w-nav-button">
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="hero-center-section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-center-wrap">
          <div
          >
            <div className="badge-item-wrap">
              <div className="badge-item">
                <div className="badge-bg-text">New</div>
                <div className="badge-text">Introducing Mecha AI</div>
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799d91973e9b9e5cd873b90_button-primary-arrow.svg"
                  loading="eager"
                  alt="arrow"
                  className="badge-last-icon"
                />
              </div>
            </div>
          </div>
          <div className="hero-center-title-wrap">
            <h1
              className="hero-center-title"
            >
              AI thats designs  
              <span className="primary-span"> UI for Web Designers</span>
            </h1>
            <div>
              <p
                className="hero-center-description"
              >
                Start Free trail Now!
              </p>
              <div
                
                className="hero-center-button-wrap"
              >
                <a
                 
                  href="/login"
                  className="button-arrow w-inline-block"
                  ><div className="button-text">Try Mecha AI</div>
                  <img
                    src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799a3d93d32219bd9776144_button-light-arrow.svg"
                    loading="eager"
                    alt="icon"
                    className="button-icon"
                /></a>
              </div>
            </div>
          </div>
          <div
            className="hero-center-image-wrapper"
          >
            <div
             
              className="hero-center-decoration-one"
            ></div>
            <div className="hero-center-image-wrap">
              <img
                src="image.png"
                loading="eager"
                alt="dashboard"
                className="hero-center-image one"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
        <section className="client-section section-spacing">
      <div className="w-layout-blockcontainer container-small w-container">
        <div
          
          className="client-wrap"
        >
          <div className="client-text">
            Trusted by <span className="primary-span">5,000+</span> developers globally
          </div>
          <div className="client-main-wrap">
            <div className="client-decoration-left"></div>
            <div className="client-item-wrap">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc62b6fbb0b73504d597_client-01.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc6254399e2a9dd8c366_client-02.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc62af7b7fa49179fdaf_a576bee341b32a9eaeb3002ff55c6916_client-03.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc6227749c697986b9fd_client-04.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc6257871b61b3ed8fda_client-05.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc62037f3d364abd754c_client-06.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc62bc9735fa859a5432_87ca6be64cd8691f400614831dd310f4_client-07.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc62b6fbb0b73504d597_client-01.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc6254399e2a9dd8c366_client-02.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc62af7b7fa49179fdaf_a576bee341b32a9eaeb3002ff55c6916_client-03.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              /><img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679afc6227749c697986b9fd_client-04.svg"
                loading="eager"
                alt="client-image"
                className="client-image"
              />
            </div>
            <div className="client-decoration-right"></div>
          </div>
        </div>
      </div>
    </section>
    <section className="feature-split-section section-spacing-bottom">
      <div className="w-layout-blockcontainer container w-container">
        <div
          
          className="section-title text-center"
        >
          <h2 className="text-gradient no-margin-bottom">
            Essential tools for your projects
          </h2>
        </div>
        <div
          
          className="w-layout-grid grid-feature-split"
        >
          <div className="feature-main-split-wrap">
            <div className="feature-split-wrap">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b1058037f3d364acf20d6_feature-dashboard-01.svg"
                loading="eager"
                alt="dashboard"
                className="feature-split-image-wrap"
              />
              <div className="feature-split-info">
                <h3 className="feature-split-title">
                  AI-Powered UI Generation
                </h3>
                <p className="no-margin-bottom">
                  Turn design images into clean React code instantly. Save hours of manual coding by transforming screenshots or mockups into developer-ready components in seconds.


                </p>
              </div>
              <div className="feature-top-round"></div>
            </div>
            <div
              data-w-id="c6fc51c0-7b63-09e0-d57b-bfb69e045f65"
              className="feature-decoration-one"
            ></div>
          </div>
          <div className="feature-split-wrap border">
            <img
              src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b10586814b4647f5bba23_56babab4d4596a316fa42f72f198052f_feature-dashboard-02.svg"
              loading="eager"
              alt="dashboard"
              className="feature-split-image-wrap"
            />
            <div className="feature-split-info">
              <h3 className="feature-split-title">Streamline Frontend Development</h3>
              <p className="no-margin-bottom">
                From static designs to dynamic React UIs — accelerate your workflow with AI that understands layouts, elements, and styling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
        <section className="feature-section section-spacing-bottom">
      <div className="w-layout-blockcontainer container w-container">
        <div
         
          className="section-title"
        >
          <div className="w-layout-grid grid-feature-title">
            <h2 className="text-gradient no-margin-bottom">
              Powerful features of Mecha AI
            </h2>
            
          </div>
        </div>
        <div
          
          className="w-layout-grid grid-feature"
        >
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee9062a5762f63b29ba_feature-icon-01.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title">Instant UI Conversion</h3>
              <p className="no-margin-bottom">
                Upload a design or screenshot and get fully functional React components in seconds — no manual coding needed.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee9f199e6e74607f185_feature-icon-02.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title">AI-Powered Recognition</h3>
              <p className="no-margin-bottom">
                Advanced computer vision detects layout, hierarchy, and styling with high accuracy.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee90a13c84805069724_feature-icon-03.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            
            <div className="feature-info">
              <h3 className="info-card-title">Developer-Ready Code</h3>
              <p className="no-margin-bottom">
                Preserves design details like spacing, typography, and color for pixel-perfect translation.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee901275a163d207dc2_feature-icon-04.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title">Design-to-Code Fidelity</h3>
              <p className="no-margin-bottom">
                Preserves design details like spacing, typography, and color for pixel-perfect translation.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee9237b1e1bf8ab0884_8bde301db5b0c4da913b6bc5a8320afc_feature-icon-05.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title"> Custom Component Mapping</h3>
              <p className="no-margin-bottom">
                
Map detected elements to your own component library for consistent design systems.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee99b6289dc8dfc1ba6_feature-icon-06.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title">Tool Integrations</h3>
              <p className="no-margin-bottom">
                
Easily connect with Figma, Sketch, or your design source of choice for smooth imports.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4eeb74c12e4b491d087f_feature-icon-07.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title">Version Control Friendly</h3>
              <p className="no-margin-bottom">
Output integrates with Git workflows and supports collaboration across dev teams.
              </p>
            </div>
          </div>
          <div data-wf--info-card--variant="base" className="info-card-item">
            <div className="info-card-icon-round">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4eea4d259571a20ff817_feature-icon-08.svg"
                loading="lazy"
                alt="feature-icon"
                className="info-card-icon"
              />
            </div>
            <div className="feature-info">
              <h3 className="info-card-title">Responsive Support

</h3>
              <p className="no-margin-bottom">
Automatically generate responsive layouts that work across devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="cta-section">
      <div className="w-layout-blockcontainer container w-container">
        <div
          
          className="cta-main-wrap"
        >
          <div className="cta-wrap">
            <div className="w-layout-grid grid-cta">
              <div className="cta-title-wrap">
                <h2 className="text-gradient no-margin-bottom">
                  Proven results that speak for themselves
                </h2>
                
              </div>
              <div className="cta-counter-wrap">
                <div className="cta-counter-item">
                  <p className="no-margin-bottom">
                    Customer satisfaction rate with project delivery.
                  </p>
                  <h2 className="cta-counter-title">
                    95<span className="cta-counter-title-span">%</span>
                  </h2>
                </div>
                <div className="cta-counter-item">
                  <p className="no-margin-bottom">
                    Fast task completion with smarter workflows &amp; tools.
                  </p>
                  <h2 className="cta-counter-title">
                    2.5<span className="cta-counter-title-span">x</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div
            data-w-id="5a4abb8a-da39-6ab4-0c3f-b37b3901d3b1"
            className="cta-decoration-one"
          ></div>
          <div
            data-w-id="aef19979-e1d5-526a-bcc3-81fe9b091bde"
            className="cta-decoration-two"
          ></div>
        </div>
      </div>
    </section>
    <section className="step-section section-spacing">
      <div className="w-layout-blockcontainer container w-container">
        <div
         
          className="section-title text-center"
        >
          <h2 className="text-gradient no-margin-bottom">
            Getting started is easy
          </h2>
        </div>
        <div
         
          className="w-layout-grid grid-step"
        >
          <div className="step-item">
            <div className="step-inner-gradient">
              <div className="step-inner-round"></div>
              <div className="step-round"><h3 className="step-number">01</h3></div>
            </div>
            <div className="step-info">
              <h3 className="step-title">Sign up and set up</h3>
              <p className="no-margin-bottom">
                Create your account 
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-inner-gradient">
              <div className="step-inner-round"></div>
              <div className="step-round"><h3 className="step-number">02</h3></div>
            </div>
            <div className="step-info">
              <h3 className="step-title">Upload UI</h3>
              <p className="no-margin-bottom">
                Upload Screen shorts of the UI 
              </p>
            </div>
          </div>
          <div
            id="w-node-_4978d749-5523-111a-3a08-28e41721ed64-530891bf"
            className="step-item"
          >
            <div className="step-inner-gradient">
              <div className="step-inner-round"></div>
              <div className="step-round"><h3 className="step-number">03</h3></div>
            </div>
            <div className="step-info">
              <h3 className="step-title">Live Preview</h3>
              <p className="no-margin-bottom">
                Preview the UI live
              </p>
            </div>
          </div>
          <img
            src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a6d927be6fd7638cf6955c_e6da06edbf04de14b147140b2d66b3d8_line.svg"
            loading="eager"
            alt="line"
            className="step-line"
          />
        </div>
      </div>
    </section>
    <section className="faqs-split-section section-spacing-bottom">
      <div className="w-layout-blockcontainer container w-container">
        <div
          
          className="w-layout-grid grid-faqs-split"
        >
          <div
            className="faqs-split-image-wrapper"
          >
            <div className="faqs-split-image-wrap">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679c79dd934bba3b7016ed12_9950eef086a90f02c6bf1f28e14a4814_faq-split-dashboard.svg"
                loading="eager"
                alt="dashboard"
                className="faqs-split-image"
              />
            </div>
            <div className="faqs-top-round"></div>
            <div
              data-w-id="a3bb7968-edbc-4da0-3e19-cf271f4f09f0"
              className="feature-decoration-one"
            ></div>
          </div>
          <div className="faqs-split-info-wrap">
            <div className="section-title">
              <h2 className="text-gradient no-margin-bottom">
                Unlock full potential of your team
              </h2>
            </div>
            <div className="faqs-split-wrap">
              <div className="about-accordion-item">
                <div
                  data-w-id="c7f28f58-3ac1-4d18-b7ef-5a91ff285581"
                  className="about-accordion-heading"
                >
                  <div className="about-accordion-heading-wrap">
                    <img
                      src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee9062a5762f63b29ba_feature-icon-01.svg"
                      loading="lazy"
                      alt="feature-icon"
                      className="about-accordion-heading-icon"
                    />
                    <h3 className="about-accordion-title">Simplify workflows</h3>
                  </div>
                  <div className="about-accordion-icon-wrap">
                    <img
                      src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679c828de4a761356f95e078_accordion-icon-white.svg"
                      loading="eager"
                      alt="icon"
                      className="about-accordion-icon"
                    />
                  </div>
                </div>
                <div className="about-accordion-content">
                  <p className="about-accordion-description">
                    Streamline task management and automate repetitive processes
                    to save time and effort.
                  </p>
                </div>
                <div className="about-accordion-divider"></div>
              </div>
              <div className="about-accordion-item">
                <div
                  data-w-id="c7f28f58-3ac1-4d18-b7ef-5a91ff285581"
                  className="about-accordion-heading"
                >
                  <div className="about-accordion-heading-wrap">
                    <img
                      src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee901275a163d207dc2_feature-icon-04.svg"
                      loading="lazy"
                      alt="feature-icon"
                      className="about-accordion-heading-icon"
                    />
                    <h3 className="about-accordion-title">Enhance collaboration</h3>
                  </div>
                  <div className="about-accordion-icon-wrap">
                    <img
                      src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679c828de4a761356f95e078_accordion-icon-white.svg"
                      loading="eager"
                      alt="icon"
                      className="about-accordion-icon"
                    />
                  </div>
                </div>
                <div className="about-accordion-content">
                  <p className="about-accordion-description">
                    Improve teamwork and communication with seamless real-time
                    collaboration, file sharing, and task management tools.
                  </p>
                </div>
                <div className="about-accordion-divider"></div>
              </div>
              <div className="about-accordion-item">
                <div
                  data-w-id="c7f28f58-3ac1-4d18-b7ef-5a91ff285581"
                  className="about-accordion-heading"
                >
                  <div className="about-accordion-heading-wrap">
                    <img
                      src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679b4ee99b6289dc8dfc1ba6_feature-icon-06.svg"
                      loading="lazy"
                      alt="feature-icon"
                      className="about-accordion-heading-icon"
                    />
                    <h3 className="about-accordion-title">
                      Deliver projects on time
                    </h3>
                  </div>
                  <div className="about-accordion-icon-wrap">
                    <img
                      src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679c828de4a761356f95e078_accordion-icon-white.svg"
                      loading="eager"
                      alt="icon"
                      className="about-accordion-icon"
                    />
                  </div>
                </div>
                <div className="about-accordion-content">
                  <p className="about-accordion-description">
                    Stay on track with smart scheduling, task automation, and
                    real-time progress tracking to meet deadlines efficiently.
                  </p>
                </div>
                <div className="about-accordion-divider"></div>
              </div>
            </div>
            <div className="faqs-button-wrap">
              <a

                href="/chat"
                className="button-arrow w-variant-004d8508-565d-37f9-39ad-0523bc228eff w-inline-block"
                ><div className="button-text">Get started now</div>
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799a3da5e5e38693cf6d135_button-dark-arrow.svg"
                  loading="eager"
                  alt="icon"
                  className="button-icon"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="testimonial-section">
      <div className="w-layout-blockcontainer container w-container">
        <div
          
          className="section-title"
        >
          <div className="w-layout-grid grid-top-testimonial">
            <div>
              <h2 className="text-gradient no-margin-bottom">
                What our customers are saying
              </h2>
            </div>
            <div className="testimonial-top-info">
              <div className="testimonial-star-wrap">
                <div className="testimonial-star-text">4.9</div>
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/679cb749287f86c2a7eaeaa2_primary-star.svg"
                  loading="eager"
                  alt="star"
                  className="testimonial-star"
                />
              </div>
              <div className="testimonial-top-text">
                Trusted by <span className="primary-span">5,000+</span> Dedevelopers globally
              </div>
            </div>
          </div>
        </div>
        <div
          
          className="testimonial-main-wrap"
        >
          <div className="testimonial-left-decorative"></div>
          <div
            data-w-id="ea39ee84-0eb0-479f-2a8b-4328395e7f28"
            className="testimonial-wrap"
          >
            
            
            
            <div
              
              className="testimonial-item two"
            >
              <div className="testimonial-top-wrap">
                <div className="testimonial-author">
                  <img
                    loading="eager"
                    src="https://mighty.tools/mockmind-api/content/human/80.jpg"
                    alt="image"
                    className="testimonial-author-image"
                  />
                  <div>
                    <h2 className="testimonial-author-name">Arshad Shaikh</h2>
                    <div>CEO of Arshad OS</div>
                  </div>
                </div>
                <a
                  className="testimonial-icon-round w-inline-block"
                  ><img
                    loading="eager"
                    src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799c55a45c81bc20fa70ea1_e1ac75de22579024f61d5c8cdc16b99f_twitter.svg"
                    alt="social-icon"
                    className="testimonial-icon"
                /></a>
              </div>
              <p className="testimonial-description">
                Mecha AI integrates seamlessly with our workflow. Converting design screenshots to React components has never been faster or easier
              </p>
            </div>
            <div
              
              className="testimonial-item one"
            >
              <div className="testimonial-top-wrap">
                <div className="testimonial-author">
                  <img
                    loading="eager"
                    src="https://mighty.tools/mockmind-api/content/human/91.jpg"
                    alt="image"
                    className="testimonial-author-image"
                  />
                  <div>
                    <h2 className="testimonial-author-name">Tushar Naik</h2>
                    <div>Sharewithall owner</div>
                  </div>
                </div>
                <a
                  target="_blank"
                  className="testimonial-icon-round w-inline-block"
                  ><img
                    loading="eager"
                    src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799c55a00832d1abfde29d7_instagram.svg"
                    alt="social-icon"
                    className="testimonial-icon"
                /></a>
              </div>
              <p className="testimonial-description">
                We used to spend hours recreating UI from mockups. Now with Mecha AI, it's drag, drop, done — the output is clean, responsive React code
              </p>
            </div>
            <div
              
              className="testimonial-item two"
            >
              <div className="testimonial-top-wrap">
                <div className="testimonial-author">
                  <img
                    loading="eager"
                    src="https://mighty.tools/mockmind-api/content/human/102.jpg"
                    alt="image"
                    className="testimonial-author-image"
                  />
                  <div>
                    <h2 className="testimonial-author-name">Neal Parmar</h2>
                    <div>Cybersecurity Expert</div>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="testimonial-icon-round w-inline-block"
                  ><img
                    loading="eager"
                    src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/6799c55a18a877f34894b224_facebook.svg"
                    alt="social-icon"
                    className="testimonial-icon"
                /></a>
              </div>
              <p className="testimonial-description">
                Mecha AI bridges the gap between design and development. It’s the missing link we didn’t know we needed.
              </p>
            </div>
          </div>
          <div className="testimonial-right-decorative"></div>
        </div>
      </div>
    </section>
    <section className="integration-section section-spacing">
      <div className="w-layout-blockcontainer inner-container w-container">
        <div
          
          className="section-title text-center"
        >
          <h2 className="text-gradient no-margin-bottom">The Ultimate UI Converter </h2>
        </div>
        <div
          
          className="w-layout-grid grid-integration-simple"
        >
          <div className="integration-wrap">
            <div className="integration-simple-icon-wrap one">
              <div className="integration-icon-round">
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614b28ce3d7d93127459_integration-icon-01.svg"
                  loading="eager"
                  alt="integration-icon"
                  className="integration-simple-icon sm"
                />
              </div>
            </div>
            <div className="integration-simple-icon-wrap two">
              <div className="integration-icon-round lg">
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614bf5d70e3892d7a556_integration-icon-02.svg"
                  loading="eager"
                  alt="integration-icon"
                  className="integration-simple-icon lg"
                />
              </div>
            </div>
            <div className="integration-simple-icon-wrap three">
              <div className="integration-icon-round">
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614b29b070deeb1a7e00_integration-icon-03.svg"
                  loading="eager"
                  alt="integration-icon"
                  className="integration-simple-icon sm"
                />
              </div>
            </div>
          </div>
          <div
            id="w-node-c6747ea1-5247-adda-0b1a-af047f04bdd1-530891bf"
            className="integration-center-wrap"
          >
            <div className="integration-icon-round center">
              <img
                src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d8af8f263184dee28_logo-icon.svg"
                loading="eager"
                alt="logo-icon"
                className="integration-simple-icon center"
              />
            </div>
          </div>
          <div className="integration-wrap">
            <div className="integration-simple-icon-wrap four">
              <div className="integration-icon-round">
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614b4ec31c574e519cfd_integration-icon-04.svg"
                  loading="eager"
                  alt="integration-icon"
                  className="integration-simple-icon sm"
                />
              </div>
            </div>
            <div className="integration-simple-icon-wrap five">
              <div className="integration-icon-round lg">
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614dd873c133280bf9d3_integration-icon-05.svg"
                  loading="eager"
                  alt="integration-icon"
                  className="integration-simple-icon lg"
                />
              </div>
            </div>
            <div className="integration-simple-icon-wrap six">
              <div className="integration-icon-round">
                <img
                  src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d953f3d795ded01fb_integration-icon-06.svg"
                  loading="eager"
                  alt="integration-icon"
                  className="integration-simple-icon sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div
         
          className="integration-bottom-wrap"
        >
          
          
        </div>
      </div>
    </section> 

    
    </>
  );
}

