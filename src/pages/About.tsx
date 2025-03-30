function About() {
    return (
        <div className="about-container">
            <h1>About This Application</h1>
            
            <section className="user-story">
                <h2>User Story</h2>
                <blockquote>
                    "I (as a nurse) want to have an easily-accessible tool (software application), 
                    where I can enter/search a drug brand name and can receive information about 
                    the administration route of that drug."
                </blockquote>
            </section>

            <section className="app-info">
                <h2>Application Overview</h2>
                <p>
                    This application was developed as a test project for B.D. to demonstrate API integration 
                    and search functionality. It utilizes the FDA's public API to provide drug information 
                    and administration routes to healthcare professionals.
                </p>
                <p>
                    The application allows you to search for drugs by brand name and receive information 
                    about the administration route of that drug.
                </p>
                <p>
                    Due to the nature of the API, the results are grouped by the following fields:
                </p>
                <ul>
                    <li>Brand Name</li>
                    <li>Generic Name</li>
                    <li>Manufacturer Name</li>
                    <li>Dosage Form</li>
                </ul>
                <p>
                    There is currently no pagination for the results.
                </p>
            </section>

            <section className="disclaimer">
                <h2>Disclaimer</h2>
                <p>
                    Do not rely on openFDA to make decisions regarding medical care. 
                    While we make every effort to ensure that data is accurate, you should 
                    assume all results are unvalidated.
                </p>
            </section>
        </div>
    );
}

export default About;