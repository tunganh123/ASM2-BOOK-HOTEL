import React from 'react';
import "./ContentForm.css"
import { Button } from '../../../UI/Button';
export default function ContentForm() {
    return (
        <>
            <div className="divcontentform">
                <div className="contentform">
                    <h1>Save time, save money!</h1>
                    <p>Sign up and we'll send the best deals to you</p>
                    <div>
                        <input type="text" placeholder="Your Email" />
                        <Button sty={{ margin: "0", marginLeft: "1rem" }}>Subscribe</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
