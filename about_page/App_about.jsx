import'./App_about.css';

function App() {

    return (
        <div className='page'>
            <nav className='navbar'>
                <div className='nav-logo'>Origo Liggaren</div>
                <div className='nav-links'>
                <a href="/OrigoLiggaren_v2/">Home</a>
                <a href="/OrigoLiggaren_v2/about_page/" className='active'>About</a>
                </div>
            </nav>

            <h1>Welcome to the about page</h1>

        </div>
    );
}

export default App;