import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  return (
    <>
       <main>
  {/*? Slider Area Start*/}
  <div className="slider-area">
    <div className="slider-active dot-style">
      {/* Slider Single */}
      <div className="single-slider d-flex align-items-center slider-height">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-8 col-md-10 ">
              <div className="hero-wrapper">
                <div className="hero__caption">
                <h2 className='text-success'>Admin's Home</h2>
                  <h1 data-animation="fadeInUp" data-delay=".3s">
                    Health is wealth keep it healthy{" "}
                  </h1>
                  <p data-animation="fadeInUp" data-delay=".6s">
                    Almost before we knew it, we
                    <br /> had left the ground
                  </p>
                  <Link to="/about" className="btn" data-animation="fadeInLeft" data-delay=".3s" >What we do</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Slider Area End */}
  {/*? About-2 Area Start */}
  <div className="about-area2 section-padding40">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-12">
          {/* about-img */}
          <div className="about-img ">
            <img src="/assets/img/gallery/about.png" alt="" />
          </div>
        </div>
        <div className="col-lg-5 col-md-12">
          <div className="about-caption">
            {/* Section Tittle */}
            <div className="section-tittle mb-35">
              <h2>Create a healthy life you love!</h2>
            </div>
            <p className="pera-top mb-40">
              Almost before we knew it, we had left the ground
            </p>
            <p className="pera-bottom mb-30">
              Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
              dignissim dolor, a pretium mi sem ut ipsum. Fusce fermentum.
              Pellentesque libero tortor, tincidunt et.
            </p>
            <div className="icon-about">
              <img src="/assets/img/icon/about1.svg" alt="" className=" mr-20" />
              <img src="/assets/img/icon/about2.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About-2 Area End */}
  <section
    className="wantToWork-area section-bg3"
    data-background="/assets/img/gallery/section_bg01.png"
  >
    <div className="container">
      <div className="wants-wrapper w-padding2">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-7 col-lg-9 col-md-8">
            <div className="wantToWork-caption wantToWork-caption2">
              <h2>
                Happy mind <br />
                healthy life
              </h2>
              <p>
                Almost before we knew it, we
                <br /> had left the ground
              </p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4">
            <Link to="services.html" className="btn f-right sm-left">
              Take a Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*? Services Area Start */}
  <div className="service-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="single-cat text-center mb-50">
            <div className="cat-icon">
              <img src="/assets/img/icon/services1.svg" alt="" />
            </div>
            <div className="cat-cap">
              <h5>
                <a href="services.html">Physical Activity</a>
              </h5>
              <p>
                Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                dignissim dolor, a pretium mi sem ut ipsum.
              </p>
              <a href="services.html" className="plus-btn">
                <i className="ti-plus" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="single-cat text-center mb-50">
            <div className="cat-icon">
              <img src="/assets/img/icon/services2.svg" alt="" />
            </div>
            <div className="cat-cap">
              <h5>
                <a href="services.html">Physical Activity</a>
              </h5>
              <p>
                Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                dignissim dolor, a pretium mi sem ut ipsum.
              </p>
              <a href="services.html" className="plus-btn">
                <i className="ti-plus" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="single-cat text-center mb-50">
            <div className="cat-icon">
              <img src="/assets/img/icon/services3.svg" alt="" />
            </div>
            <div className="cat-cap">
              <h5>
                <a href="services.html">Physical Activity</a>
              </h5>
              <p>
                Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                dignissim dolor, a pretium mi sem ut ipsum.
              </p>
              <a href="services.html" className="plus-btn">
                <i className="ti-plus" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Services Area End */}
  {/*? Testimonial Area Start */}
  <section className="testimonial-area testimonial-padding fix">
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className=" col-lg-9">
          <div className="about-caption">
            {/* Testimonial Start */}
            <div className="h1-testimonial-active dot-style">
              {/* Single Testimonial */}
              <div className="single-testimonial position-relative">
                <div className="testimonial-caption">
                  <img
                    src="/assets/img/icon/quotes-sign.png"
                    alt=""
                    className="quotes-sign"
                  />
                  <p>
                    "The automated process starts as soon as your clothe go into
                    the machine. This site outcome is gleaming clothe.
                    Placeholder text commonly used. In publishing and graphic.
                  </p>
                </div>
                {/* founder */}
                <div className="testimonial-founder d-flex align-items-center">
                  <div className="founder-img">
                    <img src="/assets/img/icon/testimonial.png" alt="" />
                  </div>
                  <div className="founder-text">
                    <span>Robart Brown</span>
                    <p>Creative designer at Colorlib</p>
                  </div>
                </div>
              </div>
              {/* Single Testimonial */}
              <div className="single-testimonial position-relative">
                <div className="testimonial-caption">
                  <img
                    src="/assets/img/icon/quotes-sign.png"
                    alt=""
                    className="quotes-sign"
                  />
                  <p>
                    "The automated process starts as soon as your clothe go into
                    the machine. This site outcome is gleaming clothe.
                    Placeholder text commonly used. In publishing and graphic.
                  </p>
                </div>
                {/* founder */}
                <div className="testimonial-founder d-flex align-items-center">
                  <div className="founder-img">
                    <img src="/assets/img/icon/testimonial.png" alt="" />
                  </div>
                  <div className="founder-text">
                    <span>Robart Brown</span>
                    <p>Creative designer at Colorlib</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonial End */}
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*? Testimonial Area End */}
  {/*? video_start */}
  <div className="container">
    <div
      className="video-area section-bg2 d-flex align-items-center"
      data-background="/assets/img/gallery/video-bg.png"
    >
      <div className="video-wrap position-relative">
        <div className="video-icon">
          <a
            className="popup-video btn-icon"
            href="https://www.youtube.com/watch?v=up68UAfH0d0"
          >
            <i className="fas fa-play" />
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* video_end */}
  {/*? Blog Area Start */}
  <section className="home-blog-area section-padding30">
    <div className="container">
      {/* Section Tittle */}
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9 col-sm-10">
          <div className="section-tittle text-center mb-100">
            <h2>Latest Blog</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="home-blog-single mb-40">
            <div className="blog-img-cap">
              <div className="blog-img">
                <img src="/assets/img/gallery/blog1.png" alt="" />
              </div>
              <div className="blog-cap">
                <h3>
                  <a href="blog_details.html">Your daily meal plan</a>
                </h3>
                <p>
                  Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                  dignissim dolor, a pretium mi sem ut ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="home-blog-single mb-40">
            <div className="blog-img-cap">
              <div className="blog-img">
                <img src="/assets/img/gallery/blog2.png" alt="" />
              </div>
              <div className="blog-cap">
                <h3>
                  <a href="blog_details.html">
                    Food is a great source of medicine
                  </a>
                </h3>
                <p>
                  Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                  dignissim dolor, a pretium mi sem ut ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="home-blog-single mb-40">
            <div className="blog-img-cap">
              <div className="blog-img">
                <img src="/assets/img/gallery/blog3.png" alt="" />
              </div>
              <div className="blog-cap">
                <h3>
                  <a href="blog_details.html">Everyday diet plan</a>
                </h3>
                <p>
                  Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                  dignissim dolor, a pretium mi sem ut ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Blog Area End */}
  {/*? About Law Start*/}
  <section className="about-low-area mt-30">
    <div className="container">
      <div className="about-cap-wrapper">
        <div className="row">
          <div className="col-xl-5  col-lg-6 col-md-10 offset-xl-1">
            <div className="about-caption mb-50">
              {/* Section Tittle */}
              <div className="section-tittle mb-35">
                <h2>100% satisfaction guaranteed.</h2>
              </div>
              <p>Almost before we knew it, we had left the ground</p>
              <a href="about.html" className="border-btn">
                Make an Appointment
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            {/* about-img */}
            <div className="about-img">
              <div className="about-font-img">
                <img src="/assets/img/gallery/about2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Law End*/}
</main>
    </>
  )
}

export default AdminHome
