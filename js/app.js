import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
require('../scss/main.scss');


const menuListArr = [
    { id: "1", name: "features", url: "#features" },
    { id: "2", name: "pricing", url: "pricing.html" },
    { id: "3", name: "contact", url: "contact.html" },
    { id: "4", name: "login", url: "login.html" }
]

const App = () => {
    const [width, setWidth] = useState(window.innerWidth);
    React.useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    })

    const [modalShow, setModalShow] = useState(false);
    const [modalShowed, setModalShowed] = useState(false);
    
    function handleModalOn() {
        if (modalShowed === false) {
            setModalShow(true)
            setModalShowed(true)
        }   
    }

    function handleModalOff() {
        setModalShow(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleModalOn()
        }, 30000);
    }, []);


    return <>
        <Header arr={menuListArr} handleModalOn={handleModalOn} />
        <Start />
        <Features arr={featuresArr} />
        <Extensions arr={extensionsArticles} />
        <Faq arr={faqArr} />
        <Contact />
        <Footer />
        {modalShow === true ? <Modal arr={featuresArr} handleModalOff={handleModalOff} /> : null}
    </>
}



const Header = ({ arr, handleModalOn }) => {
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

    function handleBurger() {
        mobileMenuOpened ? setMobileMenuOpened(false) : setMobileMenuOpened(true)
    }

    return (
        <header onMouseOver={e => handleModalOn()} className={`header ${mobileMenuOpened ? "active" : ""}`}>
            <div className="container">
                <HeaderTop handleBurger={handleBurger} mobileMenuOpened={mobileMenuOpened} />
                <HeaderNav arr={arr} />
                {mobileMenuOpened === true ? <HeaderIcons /> : null}
            </div>
        </header>
    )
}

const HeaderTop = ({ handleBurger, mobileMenuOpened }) => {

    return (
        <div className="header-top">
            <h1 className="header-logo"><Logo mobileMenuOpened={mobileMenuOpened} /></h1>
            <button className="header-burger" onClick={e => handleBurger()}></button>
        </div>
    )
}

const Logo = ({ mobileMenuOpened }) => {
    return <img src={mobileMenuOpened ? "./images/logo-bookmark-white.svg" : "./images/logo-bookmark.svg"} alt="BOOKMARK"></img>
}


const HeaderNav = ({ arr }) => {
    return (
        <nav className="header-menu">
            <ul className="header-menu-list ">
                {arr.map(el => {
                    return <li key={el.id}><HeaderMenuLink name={el.name} url={el.url} /></li>
                })}
            </ul>
        </nav>
    )
}

const HeaderMenuLink = ({ name, url }) => {
    return <a href={url}>{name.toUpperCase()}</a>
}

const HeaderIcons = () => {
    return (
        <div className="header-icons">
            <a href="" className="logo-facebook"></a>
            <a href="" className="logo-twitter"></a>
        </div>
    )
}


// START

const Start = () => {
    return (
        <section className="start">
            <div className="container">
                <div className="start-img">
                    <img src="./images/illustration-hero.svg" alt="" />
                </div>
                <div className="start-art">
                    <h2>A Simple Bookmark Manager</h2>
                    <p>A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites
                    load instantly. Try it for free.</p>
                    <button>Get it on Chrome</button>
                    <button>Get it on Firefox</button>
                </div>
            </div>
        </section>
    )
}


// FEATURES
const featuresArr = [
    {
        id: "0",
        title: "Simple Bookmarking",
        imgUrl: "./images/illustration-features-tab-1.svg",
        h: "Bookmark in one click",
        p: "Organize your bookmarks however you like. Our Simple drag-and-drop interface gives you complete control over how you manage your favourite sites"
    },
    {
        id: "1",
        title: "Speedy Searching",
        imgUrl: "./images/illustration-features-tab-2.svg",
        h: "Intelligent search",
        p: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks"
    },
    {
        id: "2",
        title: "Easy Sharing",
        imgUrl: "./images/illustration-features-tab-3.svg",
        h: "Share your bookmarks",
        p: "Easily share your bookmarks and collections with others. Create a sharable link that you can send at the click of a button"
    }
]

const Features = ({ arr }) => {

    const [ArtId, setArtId] = useState(0)


    return (
        <section className="features">
            <div className="container">
                <div className="features-main">
                    <h2>Features</h2>
                    <p>Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between
                    your devices so you can access them on the go</p>
                    <ul className="features-list">
                        {arr.map(el => {
                            return <li className={ArtId == el.id ? "active" : ""} key={el.id} onClick={e => setArtId(el.id)}>{el.title}</li>
                        })}
                    </ul>
                </div>
            </div>

            <FeaturesArt imgUrl={arr[ArtId].imgUrl} h={arr[ArtId].h} p={arr[ArtId].p} />
        </section>
    )
}

const FeaturesArt = ({ imgUrl, h, p }) => {
    return (
        <article>
            <div className="features-img" data-art="1">
                <img src={imgUrl} />
            </div>
            <div className="features-art">
                <h2>{h}</h2>
                <p>{p}</p>
                <button>More info</button>
            </div>
        </article>
    )
}

// EXTENSIONS

const extensionsArticles = [
    { id: "0", name: "Chrome", imgUrl: "./images/logo-chrome.svg", version: "62" },
    { id: "1", name: "Firefox", imgUrl: "./images/logo-firefox.svg", version: "55" },
    { id: "2", name: "Opera", imgUrl: "./images/logo-opera.svg", version: "46" }
]

const Extensions = ({ arr }) => {
    return (
        <section className="extensions">
            <div className="container">
                <div className="extensions-main">
                    <h2>Download the extension</h2>
                    <p>We've got more browsers in the pipeline. Please do let us know if you've got a favourite you'd like us to
              prioritize</p>
                </div>

                <div className="extensions-articles">
                    {arr.map(el => {
                        return <ExtensionsArt key={el.id} name={el.name} imgUrl={el.imgUrl} version={el.version} />
                    })}
                </div>
            </div>
        </section>
    )
}

const ExtensionsArt = ({ name, imgUrl, version }) => {

    return (
        <article>
            <img src={imgUrl} alt={name} />
            <h3>Add to {name}</h3>
            <p>Minimum version {version}</p>
            <img src="./images/bg-dots.svg" alt="............................" />
            <button>Add & Install Extension</button>
        </article>
    )
}

// FAQ

const faqArr = [
    {
        id: "0",
        h: "What is Bookmark?",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, natus. Voluptatibus tempora labore distinctio ipsam exercitationem recusandae ex debitis maxime hic deserunt odio, laboriosam qui! Veritatis repudiandae earum velit ullam quisquam? Officia perspiciatis, voluptatem reprehenderit consequatur quod nulla, incidunt maxime delectus iusto tempora odit deleniti aspernatur earum voluptate possimus obcaecati suscipit fuga eum quos libero dolore in blanditiis!"
    },
    {
        id: "1",
        h: "How can I request a new browser?",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, natus. Voluptatibus tempora labore distinctio ipsam exercitationem recusandae ex debitis maxime hic deserunt odio, laboriosam qui! Veritatis repudiandae earum velit ullam quisquam?"
    },
    {
        id: "2",
        h: "Is there a mobile app?",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, natus. Voluptatibus tempora labore distinctio ipsam exercitationem recusandae ex debitis maxime hic deserunt odio, laboriosam qui!"
    },
    {
        id: "3",
        h: "What about other Chromium browsers?",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, natus. Voluptatibus tempora labore distinctio ipsam exercitationem recusandae ex debitis maxime hic deserunt odio, laboriosam qui! Veritatis repudiandae earum velit ullam quisquam?"
    }
]

const Faq = ({ arr }) => {



    return (
        <section className="faq">
            <div className="container">
                <div className="faq-main">
                    <h2>Frequently Asked Questions</h2>
                    <p>Here are some of our FAQs. If you have any other questions you'd like answered please feel free to email us.
                    </p>
                </div>
                {arr.map(el => {
                    return <FaqQuest key={el.id} h={el.h} p={el.p} />
                })}
            </div>
        </section>
    )
}

const FaqQuest = ({ h, p }) => {
    const [questOpen, setQuestOpen] = useState(false)

    function handleQuestOpen() {
        questOpen ? setQuestOpen(false) : setQuestOpen(true)
    }

    return (
        <div className="faq-question">
            <div>
                <h3>{h}</h3>
                <button className={questOpen ? "active" : ""} onClick={handleQuestOpen}></button>
            </div>
            {questOpen ? <p>{p}</p> : null}
        </div>
    )
}

// CONTACT

const Contact = () => {

    const [correct, setCorrect] = useState(true)
    const [input, setInput] = useState("")
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        if (input === "" || !input.includes("@")) {
            e.preventDefault();
            setCorrect(false)
        } else {
            setCorrect(true)
        }
    }

    const [counter, setCounter] = useState(35000)

    let a = 35000
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter => counter - 35000 / 20);
            a = a - 35000 / 20
            if (a <= 0) {
                clearInterval(interval)
            }
        }, 1000);
    }, []);

    return (
        <section className="contact">
            <div className="container">
                <p>{counter}+ ALREADY JOINED</p>
                <h3>Stay up-to-date with what we're doing</h3>
                <form onSubmit={handleSubmit}>
                    <div className="contact-input">
                        <input onChange={handleInput} value={input} type="text" placeholder="Enter your email address" />
                        {correct === true ? null : <div>Whoops, make sure it's an email</div>}

                    </div>
                    <button>Contact Us</button>
                </form>
            </div>
        </section>
    )
}

// FOOTER 

const Footer = () => {
    return (
        <footer className="footer">
            <h2 className="footer-logo"><img src="./images/logo-bookmark-white.svg" alt="BOOKMARK" /></h2>
            <ul>
                <li><a href="#features">FEATURES</a></li>
                <li><a href="pricing.html">PRICING</a></li>
                <li><a href="contact.html">CONTACT</a></li>
            </ul>
            <div className="footer-icons">
                <a href="" className="logo-facebook"></a>
                <a href="" className="logo-twitter"></a>
            </div>

        </footer>
    )
}

// MODAL

const Modal = ({ arr, handleModalOff }) => {

    const [ArtId, setArtId] = useState(0)

    return (
        <section className="features modal">

            <div className="container">
                <button onClick={e => handleModalOff()} className="modalClose"></button>
                <div className="features-main">
                    <h2>Features</h2>
                    <p>Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between
                    your devices so you can access them on the go</p>
                    <ul className="features-list">
                        {arr.map(el => {
                            return <li className={ArtId == el.id ? "active" : ""} key={el.id} onClick={e => setArtId(el.id)}>{el.title}</li>
                        })}
                    </ul>
                </div>

                <FeaturesArt imgUrl={arr[ArtId].imgUrl} h={arr[ArtId].h} p={arr[ArtId].p} />
            </div>
        </section>
    )
}


ReactDOM.render(<><App /></>, document.getElementById("app"));