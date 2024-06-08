import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import "./style.sass"

const NotFound404 = () => {
  return (
    <Fragment>
        <Helmet>
            <title>Quiz</title>
        </Helmet>
        <div style={{width: "100%", height: "calc(100vh - 56px)", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="gm7ombtx jbae33se gpl4oick bjjx79mm taijpn5t cbu4d94t j83agx80 bp9cbjyn" style={{width: "100vh", maxWidth: 450}}>
            <div className="sej5wr8e" style={{display: "flex", justifyContent: 'center',alignItems: "center"}}>
            <img
                className="hu5pjgll"
                height="112"
                src="https://static.xx.fbcdn.net/rsrc.php/y7/r/s_LXY1yMsCT.svg"
                width="112"
                alt=""
            />
            </div>
            <div className="j83agx80 cbu4d94t mysgfdmx hddg9phg">
            <div className="w0hvl6rk qjjbsfad" style={{display: "flex", justifyContent: 'center',alignItems: "center"}}>
                <span
                className="d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 ns63r2gh iv3no6db o3w64lxj b2s5l15y hnhda86s m9osqain oqcyycmt"
                dir="auto" style={{textAlign: "center", fontWeight: 600, fontSize: 24, marginBottom: 12}}
                >
                This Page Isn't Available
                </span>
            </div>
            <div className="w0hvl6rk qjjbsfad" style={{display: "flex", justifyContent: 'center',alignItems: "center"}}>
                <span
                className="d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em mdeji52x jagab5yi g1cxx5fr b1v8xokw m9osqain oqcyycmt"
                dir="auto"
                style={{textAlign: "center", fontSize: 18}}
                >
                The link may be broken, or the page may have been removed. Check
                to see if the link you're trying to open is correct.
                </span>
            </div>
            </div>
        </div>
        </div>
    </Fragment>
  );
};

export default NotFound404;
