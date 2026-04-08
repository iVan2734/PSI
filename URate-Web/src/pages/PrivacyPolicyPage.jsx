import { useNavigate, Link } from "react-router-dom";
import "./LegalPage.css";

export default function PrivacyPolicyPage() {
    const navigate = useNavigate();

    return (
        <div className="legal-page">
            <button className="legal-back" onClick={() => navigate(-1)}>← Back</button>

            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-effective">Effective date: March 31, 2026</p>

            <p className="legal-intro">
                URate ("we", "us", or "our") operates the URate music, movies, and shows rating platform.
                This Privacy Policy explains what information we collect, how we use it, and your rights
                regarding your data. By creating an account or using URate, you agree to this policy.
            </p>

            <div className="legal-section">
                <h2>1. Information We Collect</h2>
                <p><strong>Account information.</strong> When you register, we collect your email address,
                username, and a hashed version of your password. If you sign in with Google, we receive
                your Google account ID and profile picture URL from Google.</p>

                <p><strong>Rating data.</strong> When you rate a song, movie, or show, we store the
                rating score, any tags and comments you add, the content's title, artist/creator name,
                cover image URL, and the date you submitted the rating. This is the core data that
                makes URate work.</p>

                <p><strong>Spotify data.</strong> If you choose to connect your Spotify account, we
                receive and temporarily store OAuth access and refresh tokens. We use these tokens to
                fetch your recently played tracks, playlists, and top artists on your behalf. We do
                not permanently store your Spotify listening history — it is fetched fresh each time
                you open the My Music tab. When you rate a song sourced from Spotify, the track's
                title, artist, album, and cover URL are stored as part of your rating record.</p>

                <p><strong>YouTube Music data.</strong> If you choose to connect your YouTube Music
                account, we receive and store OAuth access and refresh tokens issued by Google. We use
                these tokens — via the YouTube Data API v3 — to fetch your YouTube playlists and liked
                songs on your behalf. We do not permanently store your YouTube library — it is fetched
                fresh each time you use the My Music tab. When you rate a video/song sourced from
                YouTube Music, the title, channel name, and thumbnail URL are stored as part of your
                rating record. Our use of data from Google APIs complies with the
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer"> Google API Services User Data Policy</a>, including Limited Use requirements.</p>

                <p><strong>Email tokens.</strong> For email verification and password resets, we
                generate and temporarily store one-time tokens linked to your account. These expire
                and are invalidated after use.</p>
            </div>

            <div className="legal-section">
                <h2>2. How We Use Your Information</h2>
                <ul>
                    <li>To create and manage your account.</li>
                    <li>To display your ratings and allow you to manage them.</li>
                    <li>To calculate and display community ratings and trending tags.</li>
                    <li>To fetch your Spotify and/or YouTube Music data when you use the My Music feature.</li>
                    <li>To send account-related emails (verification, password reset). We will never
                        send you marketing emails without your explicit consent.</li>
                    <li>To maintain the security and integrity of the service.</li>
                </ul>
                <p>We do not sell your data, use it for advertising targeting, or share it with
                data brokers or ad networks.</p>
            </div>

            <div className="legal-section">
                <h2>3. Spotify Data</h2>
                <p>URate integrates with the Spotify Web API. When you connect your Spotify account:</p>
                <ul>
                    <li>We request the minimum scopes necessary: recently played tracks, private
                        playlists, and top tracks/artists.</li>
                    <li>Your Spotify OAuth tokens are stored securely in our database and used only
                        to fetch your data from Spotify on your behalf.</li>
                    <li>We do not permanently cache your Spotify listening history — it is fetched
                        live and displayed to you only.</li>
                    <li>You can disconnect your Spotify account at any time using the "Disconnect
                        Spotify" button in the My Music tab. Upon disconnection, your OAuth tokens
                        are immediately deleted from our database and we stop accessing your Spotify
                        data.</li>
                    <li>We do not transfer any data obtained from Spotify to ad networks, data brokers,
                        or any monetization tools.</li>
                    <li>Spotify is a data controller with respect to your Spotify personal data.
                        Their <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a> governs
                        how Spotify processes your data.</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>4. YouTube Music Data</h2>
                <p>URate integrates with the YouTube Data API v3. When you connect your YouTube Music account:</p>
                <ul>
                    <li>We request the minimum scope necessary: <code>youtube.readonly</code> — read-only
                        access to your YouTube playlists and liked videos.</li>
                    <li>Your Google OAuth tokens are stored securely in our database and used only
                        to fetch your YouTube Music data on your behalf.</li>
                    <li>We do not permanently cache your YouTube library — it is fetched live and
                        displayed to you only.</li>
                    <li>You can disconnect YouTube Music at any time using the "Disconnect YT Music"
                        button in the My Music tab. Upon disconnection, your OAuth tokens are immediately
                        deleted from our database and we stop accessing your YouTube data.</li>
                    <li>We do not transfer any data obtained from Google/YouTube APIs to ad networks,
                        data brokers, or any monetization tools.</li>
                    <li>Our use of data from Google APIs adheres to the
                        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer"> Google API Services User Data Policy</a>,
                        including the Limited Use requirements. We do not use YouTube data for
                        advertising, profiling, or any purpose beyond operating the My Music feature.</li>
                    <li>Google is a data controller with respect to your Google personal data.
                        Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> governs
                        how Google processes your data.</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>5. Third-Party Services</h2>
                <p>URate uses the following third-party services to operate:</p>
                <ul>
                    <li><strong>Spotify Web API</strong> — to access your Spotify music data (only when connected).</li>
                    <li><strong>YouTube Data API v3 (Google)</strong> — to access your YouTube Music data
                        (only when connected).</li>
                    <li><strong>Deezer API</strong> — to provide music search and trending charts. No personal
                        data is sent to Deezer.</li>
                    <li><strong>Google Identity Services</strong> — optional sign-in method. If used, Google
                        processes your authentication. See Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</li>
                    <li><strong>TMDB (The Movie Database)</strong> — to provide movie and show data. No personal
                        data is sent to TMDB.</li>
                    <li><strong>Email provider</strong> — to deliver transactional emails (verification and
                        password reset).</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>6. Cookies and Local Storage</h2>
                <p>URate does not use tracking cookies. We store your authentication token in your
                browser's <strong>localStorage</strong> to keep you logged in across sessions. This token
                is a signed JWT and contains only your user ID and username. It is not accessible to
                third-party scripts and is deleted when you log out.</p>
                <p>Third-party services integrated into URate (such as Google Sign-In) may set their
                own cookies, governed by their respective privacy policies.</p>
            </div>

            <div className="legal-section">
                <h2>7. Data Retention</h2>
                <p>We retain your account information and ratings for as long as your account exists.
                You may delete your account at any time (contact us at the address below), which will
                permanently remove all your personal data and ratings.</p>
                <p>Spotify and YouTube Music OAuth tokens are retained only while those accounts are
                connected. They are deleted immediately when you disconnect or delete your account.</p>
                <p>Email verification and password reset tokens expire within 24 hours and are
                invalidated after a single use.</p>
            </div>

            <div className="legal-section">
                <h2>8. Your Rights</h2>
                <p>Depending on where you live, you may have rights regarding your personal data,
                including the right to access, correct, delete, or export it. To exercise any of
                these rights, contact us at the address below. We will respond within 30 days.</p>
                <p>If you are in the EU/EEA, you also have the right to lodge a complaint with your
                local data protection authority.</p>
            </div>

            <div className="legal-section">
                <h2>9. Security</h2>
                <p>We implement industry-standard security measures including password hashing (bcrypt),
                signed JWT tokens, HTTPS in production, and access controls. No system is 100% secure,
                and we cannot guarantee absolute security, but we take reasonable steps to protect
                your data.</p>
                <p>If we become aware of a security breach that affects your personal data, we will
                notify you as required by applicable law.</p>
            </div>

            <div className="legal-section">
                <h2>10. Children</h2>
                <p>URate is not intended for users under the age of 13 (or the applicable minimum age
                in your country). We do not knowingly collect personal data from children. If you
                believe a child has provided us with personal data, please contact us and we will
                delete it promptly.</p>
            </div>

            <div className="legal-section">
                <h2>11. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Material changes will be
                communicated by updating the effective date at the top of this page. Continued use
                of URate after changes are posted constitutes acceptance of the updated policy.</p>
            </div>

            <div className="legal-section">
                <h2>12. Contact</h2>
                <p>For questions, data requests, or concerns about this Privacy Policy, contact us at:</p>
                <div className="legal-highlight">
                    <p><strong>URate</strong><br />
                    Email: <a href="mailto:milos@umanage.rs">milos@umanage.rs</a></p>
                </div>
            </div>

            <hr className="legal-divider" />

            <div className="legal-contact">
                <p>Also read our</p>
                <div className="legal-sibling-links">
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </div>
        </div>
    );
}
