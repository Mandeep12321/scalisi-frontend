import React from "react";
import classes from "./UnderWorkingPageTemplate.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";

const UnderWorkingPageTemplate = ({
  title,
  description,
  email,
  descriptionSuffix,
  showLoginButton,
  onLoginClick,
  isWorking = true,
}) => {
  return (
    <Container>
      <div className={classes.underWorkingContainer}>
        <div className={classes.contentWrapper}>
          <div className={classes.textContent}>
            <h1 className={classes.mainTitle}>{title || "Under Working"}</h1>
            <p className={classes.subtitle}>
              {description ||
                "We are currently working on this page. Please check back later."}
              {email && (
                <>
                  {" "}
                  <span className={classes.emailHighlight}>{email}</span>
                </>
              )}
              {descriptionSuffix && <>{descriptionSuffix}</>}
            </p>
            {showLoginButton && (
              <div className={classes.loginButtonWrapper}>
                <Button
                  onClick={onLoginClick}
                  className={classes.loginButton}
                  label="Login"
                />
              </div>
            )}
            {isWorking && (
              <div className={classes.statusInfo}>
                <div className={classes.statusItem}>
                  <span className={classes.statusIcon}>🚧</span>
                  <span>Work in Progress</span>
                </div>
                <div className={classes.statusItem}>
                  <span className={classes.statusIcon}>⏱️</span>
                  <span>Coming Soon</span>
                </div>
              </div>
            )}
          </div>
          <div className={classes.imageWrapper}>
            <Image
              src="/assets/images/cms-images/working.jpg"
              alt="Page under construction"
              fill
              className={classes.constructionImage}
              priority
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UnderWorkingPageTemplate;
