"use client";
import { Button } from "@/components/atoms/Button";
import LoadingComponent from "@/components/atoms/LoadingComponent";
import { Checkbox } from "@/components/molecules/Checkbox";
import { Get } from "@/interceptor/axiosInterceptor";
import { mergeClass } from "@/resources/utils/helper";
import { saveSelectedLocation } from "@/store/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./LocationsModal.module.css";

export default function LocationsModal({ show, setShow, showCloseIcon, cb }) {
  const { isLogin, accessToken } = useSelector((state) => state.authReducer);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState("");
  const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedLocationData, setSelectedLocationData] = useState({});
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state.authReducer);

  // Check if any location is selected
  const isLocationSelected = Object.keys(selectedLocationData).length > 0;

  // getLocations
  const getLocations = async () => {
    setLoading("loading");

    const { response } = await Get({
      route: `users/locations/all`,
    });

    if (response) {
      const locationsData = response?.data?.data;
      setLocations(locationsData);

      if (locationsData && locationsData.length === 1) {
        const singleLocation = locationsData[0];
        setSelectedLocations({
          [singleLocation.ERP_CID + singleLocation.ERP_SID]:
            singleLocation.name,
        });
        setSelectedLocationData(singleLocation);

        // Auto-save and close modal after 2 seconds for single location
        setTimeout(() => {
          dispatch(saveSelectedLocation(singleLocation));
          setShow(false);
        }, 5000);
      }
    }
    setLoading("");
  };

  const handleSetLocation = () => {
    if (!isLocationSelected) return;

    dispatch(saveSelectedLocation(selectedLocationData));
    setShow(false);
  };

  const handleCloseModal = () => {
    if (!isLocationSelected) return;
    setShow(false);
  };

  useEffect(() => {
    // Only call getLocations if user is logged in AND has an access token
    if (isLogin && accessToken) {
      getLocations();
    }

    if (location && Object.keys(location).length > 0) {
      setSelectedLocations({
        [location.ERP_CID + location.ERP_SID]: location.name,
      });
      setSelectedLocationData(location);
    }
  }, [isLogin, accessToken]);

  return (
    <>
      <ModalSkeleton
        headerHeading={classes.headClass}
        borderRadius="20px"
        header={"Choose Locations"}
        setShow={isLocationSelected ? setShow : () => {}}
        show={show}
        modalClass={classes.modalBody}
        size={100}
        width={"340px"}
        maxWidth={"340px"}
        showCloseIcon={showCloseIcon && isLocationSelected}
      >
        {loading === "loading" ? (
          <div className={classes.mainHeight}>
            <LoadingComponent />
          </div>
        ) : (
          <>
            <div className={classes.mainDiv}>
              <p>
                {locations.length === 1
                  ? "Your location"
                  : "Choose a location to get products"}
              </p>
              {locations?.map((location) => (
                <Checkbox
                  key={location.ERP_CID + location.ERP_SID}
                  checkboxMain={classes.checkboxMain}
                  value={
                    selectedLocations[location.ERP_CID + location.ERP_SID] ||
                    false
                  }
                  setValue={(val) => {
                    // Only allow changes if there are multiple locations
                    if (locations.length > 1) {
                      setSelectedLocations(() => ({
                        [location.ERP_CID + location.ERP_SID]: val,
                      }));
                      setSelectedLocationData(location);
                      cb && cb(location);
                    }
                  }}
                  name={location.ERP_CID + location.ERP_SID}
                  label={location.name}
                  disabled={locations.length === 1}
                />
              ))}
            </div>
            <Button
              className={mergeClass("fw-700 fs-15", classes.actionButton)}
              variant="primary"
              label="Set Location"
              onClick={handleSetLocation}
              disabled={!isLocationSelected}
            />
          </>
        )}
      </ModalSkeleton>
    </>
  );
}
