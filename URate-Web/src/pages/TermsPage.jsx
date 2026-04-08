import { useNavigate, Link } from "react-router-dom";
import "./LegalPage.css";

export default function TermsPage() {
    const navigate = useNavigate();

    return (
        <div className="legal-page">
            <button className="legal-back" onClick={() => navigate(-1)}>← Back</button>

            <h1 className="legal-title">Terms of Service</h1>
            <p className="legal-effective">Effective date: March 31, 2026</p>

            <p className="legal-intro">
                These Terms of Service ("Terms") govern your use of URate, a music, movies, and shows
                rating platform operated by URate ("we", "us", or "our"). By creating an account or
                using the service, you agree to be bound by these Terms. If you do not agree, do not
                use URate.
            </p>

            <div className="legal-section">
                <h2>1. Eligibility and Account Registration</h2>
                <p>You must be at least 13 years old (or the applicable minimum age in your country)
                to use URate. By registering, you represent that you meet this requirement.</p>
                <p>You are responsible for maintaining the confidentiality of your login credentials
                and for all activity that occurs under your account. You agree to notify us immediately
                of any unauthorized use of your account.</p>
                <p>You may not create an account on behalf of another person without their permission,
                or use a username that is offensive, misleading, or that infringes the rights of others.</p>
            </div>

            <div className="legal-section">
                <h2>2. Description of the Service</h2>
                <p>URate allows users to rate songs, movies, and shows, add tags and comments, and
                view community ratings. URate optionally integrates with the Spotify Web API and
                the YouTube Data API to display a user's own music library data (recently played,
                playlists, liked songs, top tracks and artists) in a personal "My Music" tab.</p>
                <p>URate does not stream music. Music data is sourced from the Deezer API (for
                discovery), the Spotify Web API (for your personal Spotify library, when connected),
                and the YouTube Data API (for your YouTube Music library, when connected).
                Movie and show data is sourced from TMDB.</p>
            </div>

            <div className="legal-section">
                <h2>3. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use URate for any unlawful purpose or in violation of any applicable law.</li>
                    <li>Upload, post, or transmit content that is defamatory, obscene, harassing, or
                        that infringes the intellectual property rights of others.</li>
                    <li>Attempt to gain unauthorized access to URate's systems or other users' accounts.</li>
                    <li>Use automated scripts, bots, or scrapers to access the service.</li>
                    <li>Interfere with or disrupt the integrity or performance of the service.</li>
                    <li>Artificially manipulate community ratings or tags.</li>
                </ul>
                <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
            </div>

            <div className="legal-section">
                <h2>4. User Content</h2>
                <p>You retain ownership of the ratings, tags, and comments you submit ("User Content").
                By submitting User Content, you grant URate a worldwide, non-exclusive, royalty-free
                license to store, display, and use your User Content to operate the service, including
                displaying aggregate community data to other users.</p>
                <p>You are solely responsible for the User Content you submit. URate does not endorse
                any User Content and has no obligation to monitor it, but reserves the right to remove
                content that violates these Terms.</p>
            </div>

            <div className="legal-section">
                <h2>5. Third-Party Services — Spotify</h2>
                <p>URate integrates with the Spotify Web API. By connecting your Spotify account, you
                additionally agree to <a href="https://www.spotify.com/legal/end-user-agreement/" target="_blank" rel="noreferrer">Spotify's Terms and Conditions</a>. The
                following terms apply specifically to your use of URate's Spotify integration:</p>

                <ul>
                    <li><strong>No warranties from Spotify.</strong> URate makes no warranties or
                        representations on behalf of Spotify. Spotify's platform and content are provided
                        "as is" and Spotify expressly disclaims all implied warranties of merchantability,
                        fitness for a particular purpose, and non-infringement with respect to the
                        Spotify platform, content, and service.</li>

                    <li><strong>No modification of Spotify content.</strong> You may not modify, create
                        derivative works based upon, disassemble, decompile, reverse-engineer, or otherwise
                        reduce to human-perceivable form any part of the Spotify platform, Spotify service,
                        or Spotify content, to the fullest extent permitted by applicable law.</li>

                    <li><strong>URate is responsible; Spotify is not.</strong> URate is solely responsible
                        for the Spotify integration within this application. Spotify has no liability
                        whatsoever in connection with URate or your use of URate's Spotify features.</li>

                    <li><strong>Spotify as third-party beneficiary.</strong> Spotify AB is an intended
                        third-party beneficiary of these Terms and the Privacy Policy and is entitled to
                        directly enforce these Terms against you as they relate to the Spotify platform,
                        content, and service.</li>
                </ul>

                <div className="legal-highlight">
                    <p>URate's Spotify integration is a Non-Streaming SDA under the Spotify Developer
                    Terms. URate does not stream Spotify music and does not enable playback of Spotify
                    audio content through its interface.</p>
                </div>
            </div>

            <div className="legal-section">
                <h2>6. Third-Party Services — YouTube Music</h2>
                <p>URate integrates with the YouTube Data API v3, provided by Google LLC, to display
                your YouTube Music playlists and liked songs. By connecting your YouTube Music account,
                you additionally agree to <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">YouTube's Terms of Service</a> and
                Google's <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>. The following terms apply to your use
                of URate's YouTube Music integration:</p>

                <ul>
                    <li><strong>No warranties from Google or YouTube.</strong> URate makes no warranties or
                        representations on behalf of Google or YouTube. YouTube and Google content and
                        services are provided "as is" and Google expressly disclaims all implied
                        warranties with respect to the YouTube platform and content.</li>

                    <li><strong>No modification of YouTube content.</strong> You may not modify, create
                        derivative works based upon, disassemble, decompile, reverse-engineer, or otherwise
                        reduce to human-perceivable form any part of the YouTube or Google platform,
                        service, or content.</li>

                    <li><strong>URate is responsible; Google and YouTube are not.</strong> URate is solely
                        responsible for the YouTube Music integration within this application. Google LLC
                        and YouTube have no liability whatsoever in connection with URate or your use of
                        URate's YouTube Music features.</li>

                    <li><strong>Google API Services User Data Policy.</strong> URate's use of information
                        received from Google APIs adheres to the
                        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer"> Google API Services User Data Policy</a>,
                        including the Limited Use requirements.</li>
                </ul>

                <div className="legal-highlight">
                    <p>URate's YouTube Music integration is read-only. URate does not stream YouTube
                    content and does not write, modify, or delete any data in your YouTube or
                    Google account.</p>
                </div>
            </div>

            <div className="legal-section">
                <h2>7. Third-Party Services — Other</h2>
                <p>URate also uses Deezer (music discovery), TMDB (movie and show data), and Google
                Identity Services (optional sign-in). Your use of these services is subject to their
                respective terms and privacy policies. URate is not responsible for the content,
                accuracy, or policies of these third-party services.</p>
            </div>

            <div className="legal-section">
                <h2>8. Intellectual Property</h2>
                <p>All content, design, code, and materials comprising URate (excluding User Content
                and third-party data) are the intellectual property of URate and are protected by
                applicable copyright and other intellectual property laws.</p>
                <p>Content sourced from third-party APIs (Deezer, Spotify, YouTube, TMDB, Google) remains
                the property of the respective providers and their licensors. You may not reproduce,
                distribute, or create derivative works from such content beyond what is permitted by
                these Terms and the applicable third-party terms.</p>
            </div>

            <div className="legal-section">
                <h2>9. Disclaimer of Warranties</h2>
                <p>URate is provided <strong>"as is"</strong> and <strong>"as available"</strong> without
                warranties of any kind, either express or implied, including but not limited to implied
                warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                <p>We do not warrant that the service will be uninterrupted, error-free, or that defects
                will be corrected. We do not warrant the accuracy or completeness of any content provided
                through the service, including ratings or third-party data.</p>
            </div>

            <div className="legal-section">
                <h2>10. Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable law, URate and its operators shall not
                be liable for any indirect, incidental, special, consequential, or punitive damages,
                including loss of data, loss of profits, or any other loss, arising out of or in
                connection with your use of or inability to use the service.</p>
                <p>In no event shall URate's total liability to you for all claims exceed the amount
                you have paid to URate in the twelve months preceding the claim (or, if you have paid
                nothing, €10).</p>
            </div>

            <div className="legal-section">
                <h2>11. Indemnification</h2>
                <p>You agree to indemnify and hold harmless URate and its operators from and against
                any claims, liabilities, damages, losses, and expenses (including reasonable legal fees)
                arising out of or in any way connected with your use of the service, your User Content,
                or your violation of these Terms.</p>
            </div>

            <div className="legal-section">
                <h2>12. Account Termination</h2>
                <p>You may stop using URate at any time. You may request account deletion by contacting
                us at the address below. Upon deletion, all your personal data and ratings will be
                permanently removed.</p>
                <p>We reserve the right to suspend or terminate your account without prior notice if
                you violate these Terms, if required by law, or if we discontinue the service.</p>
            </div>

            <div className="legal-section">
                <h2>13. Changes to These Terms</h2>
                <p>We may update these Terms from time to time. Material changes will be communicated
                by updating the effective date. Continued use of URate after changes are posted
                constitutes your acceptance of the updated Terms.</p>
            </div>

            <div className="legal-section">
                <h2>14. Governing Law</h2>
                <p>These Terms are governed by and construed in accordance with the laws of Serbia,
                without regard to its conflict of law principles. Any disputes arising under these
                Terms shall be subject to the exclusive jurisdiction of the competent courts in Serbia.</p>
            </div>

            <div className="legal-section">
                <h2>15. Contact</h2>
                <p>Questions about these Terms should be directed to:</p>
                <div className="legal-highlight">
                    <p><strong>URate</strong><br />
                    Email: <a href="mailto:milos@umanage.rs">milos@umanage.rs</a></p>
                </div>
            </div>

            <hr className="legal-divider" />

            <div className="legal-contact">
                <p>Also read our</p>
                <div className="legal-sibling-links">
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}
