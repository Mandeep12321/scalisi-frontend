import React, { useEffect, useRef, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Cookies from "js-cookie";

export default function ImageDropDown({ options, dropDown, setDropdown }) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSelect = async (code) => {
    setLoading(true);

    // Handle language translation similar to LanguageSwitch
    const googleTrans = Cookies.get("googtrans");
    let oldData = googleTrans;

    // Remove existing translation cookies
    Cookies.remove("googtrans", {
      path: "/",
      domain: `${window?.location?.hostname}`,
    });
    Cookies.remove("googtrans", {
      path: "/",
      domain: `.${window?.location?.hostname}`,
    });

    // Set new translation based on selected language
    if (code === "ES") {
      Cookies.set("googtrans", `/en/es`);
    } else if (code === "HT") {
      Cookies.set("googtrans", `/en/ht`);
    } else {
      Cookies.set("googtrans", `/en/en`);
    }

    setDropdown(code);
    setIsOpen(false);

    // Reload page to apply translation
    window.location.reload();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <style>
        {`
          .ReactFlagsSelect-module_flagsSelect__2pfa2 {
              min-width: 80px;
              padding-bottom: 0px;
                  max-height: 43.5px !important;
          }
          .ReactFlagsSelect-module_flagsSelect__2pfa2:hover {
            background-color: var(--border-green);
          }
           
          .ReactFlagsSelect-module_selectBtn__19wW7 .ReactFlagsSelect-module_label__27pw9 {
            display: none;
          }
          .ReactFlagsSelect-module_selectBtn__19wW7 {
              padding: 3px 6px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: relative;
          }
          
          /* Hide the default dropdown arrow */
          .ReactFlagsSelect-module_selectBtn__19wW7:after {
              content: '';
              display: none;
          }

   .ReactFlagsSelect-module_selectBtn__19wW7[aria-expanded="true"]:after {

    display:none;
  
}
          .ReactFlagsSelect-module_label__27pw9, .ReactFlagsSelect-module_secondaryLabel__37t1D {
                  padding-left: 5px !important;
                }
                
          /* Prevent Google Translate from translating language dropdown labels */
          .ReactFlagsSelect-module_label__27pw9, 
          .ReactFlagsSelect-module_secondaryLabel__37t1D,
          .ReactFlagsSelect-module_selectOptionWithlabel__2GpmM {
            -webkit-translate: no;
            -moz-translate: no;
            translate: no;
          }
          
          /* Additional protection for language dropdown labels */
          .ReactFlagsSelect-module_flagsSelect__2pfa2 .notranslate,
          .ReactFlagsSelect-module_selectBtn__19wW7 .notranslate,
          .ReactFlagsSelect-module_selectOptions__3LNBJ .notranslate {
            -webkit-translate: no !important;
            -moz-translate: no !important;
            translate: no !important;
          }

 
          /* Custom icon */
          .custom-dropdown-icon {
              position: absolute;
                right: 10px;
                top: 45%;
                transform: translateY(-50%);
                height: 15px;
          }

          .ReactFlagsSelect-module_selectFlag__2q5gC svg {
            width: 29.5px;
            // height:25px;
            border-radius: 3px;
            // padding-bottom:1.5px;
          }
          .ReactFlagsSelect-module_selectOptions__3LNBJ {
              border-radius: 0px 0px 3px 3px;
              margin-top: -6px;
              padding: 0px 0;
              min-width: 75px;
              max-width: 75px !important;
              font-size: 12px !important;
              border: 2px solid #e1e1e1;
          }
          .ReactFlagsSelect-module_selectBtn__19wW7 {
              padding-block: 6px;
              max-width: 80px;
              border-radius: 8px;
              border: 2px solid #e1e1e1;
              position: relative;
          }
          .ReactFlagsSelect-module_selectOption__3pcgW:hover, .ReactFlagsSelect-module_selectOption__3pcgW:focus {
              outline: none;
              background: #BC0A0E;
              color: white;
          }
          .ReactFlagsSelect-module_selectOptionWithlabel__2GpmM {
              padding: 4px 5px;
          }


          @media(max-width: 375px){
            .custom-dropdown-icon {
              position: absolute;
                right: 11px;
                top: 49%;
                transform: translateY(-50%);
                height: 15px;
            }
                .ReactFlagsSelect-module_label__27pw9, .ReactFlagsSelect-module_secondaryLabel__37t1D {
                  padding-left: 5px;
                }
          }

        `}
      </style>
      <div
        style={{ position: "relative" }}
        ref={dropdownRef}
        className="notranslate"
      >
        <div
          // className="ReactFlagsSelect-module_selectBtn__19wW7"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ReactFlagsSelect
            selected={dropDown}
            onSelect={onSelect}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            countries={options.map((option) => option.value)}
            customLabels={options.reduce((acc, { label, value }) => {
              acc[value] = label;
              return acc;
            }, {})}
            className="notranslate"
          />
          {/* Change the arrow based on dropdown state */}
          {isOpen ? (
            <FaChevronUp
              className="custom-dropdown-icon"
              size={12}
              color="#d3d0d0"
            />
          ) : (
            <FaChevronDown
              className="custom-dropdown-icon"
              size={12}
              color="#d3d0d0"
            />
          )}
        </div>
      </div>
    </>
  );
}
