import React from "react";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import Image from "next/image";
import classes from "./AccordionComponent.module.css";
import { mergeClass } from "@/resources/utils/helper";

const CustomToggle = ({ eventKey, callback }) => {
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  return (
    <span
      className={mergeClass("accordion-icon", classes.accordianIcon)}
      onClick={decoratedOnClick}
    >
      {/* <FaChevronDown color="#363636" className="closed-icon" />
      <FaChevronUp color="#363636" className="open-icon" /> */}

      <Image
        src="/assets/images/svg/chevrondown.svg"
        alt="Chevron Down"
        width={22}
        height={22}
        className="closed-icon"
      />

      <Image
        src="/assets/images/svg/chevronup.svg"
        alt="Chevron Up"
        width={22}
        height={22}
        className="open-icon"
      />

      {/* ya change kr k svg lagaleen */}
    </span>
  );
};

const AccordionComponent = ({
  items = [],
  customStyle = {},
  defaultKey = "0",
  children,
  heading,
}) => {
  return (
    <>
      <style>
        {`
         .accordion-item {
            display: flex;
            flex-direction: column;
            gap: 0px !important;
         }
         .accordion-button {
            font-weight: 700;
            border-radius: 80px !important;
            height: auto !important;
            background: transparent !important;
            border: none;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
         }
         .accordion-button::after {
            display: none !important; /* Remove Bootstrap default arrow */
         }
         .accordion-icon {
            margin-left: auto;
            transition: transform 0.3s ease-in-out;
            font-size: 16px;
         }
         .open-icon {
            display: none;
         }
            .accordion-button:not(.collapsed){
            box-shadow: none !important;
            }
         .accordion-button:not(.collapsed) .closed-icon {
            display: none;
         }
         .accordion-button:not(.collapsed) .open-icon {
            display: inline;
         }
         .accordion-button:focus {
            box-shadow: none;
            color: #000;
         }
          @media (max-width: 768px) {
            .accordion-button {
                font-size: 20px !important;
                height: auto !important;
                line-height: 20px !important;
                color: var(--primary-color) !important;
                padding-inline: 0px;
                // padding-block: 8px;
            }

            .accordion-item:last-of-type>.accordion-header .accordion-button.collapsed{
              padding-top: 12px !important;
            }
         
            .accordion-button:not(.collapsed) .open-icon {
                display: inline;
                position: relative;
                bottom: 3px !important;
            }
          }
        `}
      </style>

      <Accordion
        defaultActiveKey={defaultKey}
        style={{ width: "100%", ...customStyle }}
      >
        <Accordion.Item eventKey={defaultKey} className={classes.accordionItem}>
          <Accordion.Header className={classes.accordionHeader}>
            {heading}
            <CustomToggle eventKey={defaultKey} />
          </Accordion.Header>
          <Accordion.Body className={classes.accordionBody}>
            {children}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default AccordionComponent;
