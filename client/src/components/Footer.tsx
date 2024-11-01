function Footer() {
    const date = new Date();
    return (
        <>
            <footer>
                <p>&copy; Copyright {date.getFullYear()} </p>
                <p>Designed & Developed by Mike Caiati Kandyce Mbua & City Smith</p>
            </footer>
        </>
    )
}

export default Footer;