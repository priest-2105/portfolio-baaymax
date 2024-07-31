import Head from 'next/head'
import userInfo from "../../data/usersInfo.json"

export default function DomHead({ pageName = "Home Page" }) {

    return (
        <Head>
            <title>{userInfo.github_username} Portfolio - {pageName} </title>
            {/* meta tags begins */}
            {/* Primary Meta Tags */}
            <meta name="title" content="Bailey - Personal Portfolio." />
            <meta name="description" content="Generated using BaayMax." />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
         
            {/* meta tags end */}
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        </Head>
    )
}

