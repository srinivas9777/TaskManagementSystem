import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent= ({inverted=true,content = 'Loading...'})=>{

    return(
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}></Loader>
        </Dimmer>
    )

}

export default LoadingComponent;