import React from 'react'
import { Route, Redirect } from "react-router-dom";

export const NoAuthRoute = ({ component: Component, ...rest }) => {
    const auth = localStorage.getItem("Authorization");
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/dashboard",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    )
}
