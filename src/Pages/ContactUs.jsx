import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaGoogle } from "react-icons/fa";

function ContactUs() {
    return (
        <>
            {/* Contact Form Section */}
            <section id="contact-us" className="container text-center mt-5 py-5">
                <h1 className="text-danger fw-bold">How Can We Help You?</h1>
                <p className="text-muted">We'd love to hear from you! Fill out the form below.</p>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="text-start">
                            <div className="mb-2">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile No</label>
                                <input type="tel" className="form-control" placeholder="Enter your mobile number" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Feedback</label>
                                <textarea className="form-control" rows="3" placeholder="Write your feedback"></textarea>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-dark text-light py-2 mt-2 ">
                <div className="container">
                    <div className="row">
                        

                        {/* About */}
                        <div className="col-md-5 mb-1">
                            <h6 className="text-uppercase fw-bold">About Us</h6>
                            <ul className="list-unstyled">
                                <li><a href="/aboutus" className="text-light">Our Company</a></li>
                                <li><a href="/careers" className="text-light">Careers</a></li>
                            </ul>
                        </div>

                        {/* Social Media Links */}
                        <div className="col-md-2 mb-1">
                            <h6 className="text-uppercase fw-bold">Follow Us</h6>
                            <a href="https://www.facebook.com" className="text-light mx-2"><FaFacebook size={24} /></a>
                            <a href="https://www.instagram.com" className="text-light mx-2"><FaInstagram size={24} /></a>
                            <a href="https://www.twitter.com" className="text-light mx-2"><FaTwitter size={24} /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default ContactUs;
