import { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../actions/updateState";
import Label from "../components/LabelComponent";
import TextField from "../components/TextFieldComponent";
import Button from "../components/ButtonComponent";
import Select from "../components/SelectComponent";
import Grid from "@mui/material/Grid";
import "./Page2.css";
import BreadcrumComponent from "../components/BreadcrumbComponent";
import Popup from "../components/Popup";
import Snackbar from "../components/SnackbarComponent";
import CircularProgress from "@mui/material/CircularProgress";

const Page2 = (props) => {
  const history = useHistory();
  const location = useLocation();
  const currentState = useSelector((state) => state);
  const [city, setCity] = useState(location.state.props[0]);
  const [population, setPopulation] = useState(location.state.props[1]);
  const [vaccinated, setVaccinated] = useState(location.state.props[2]);
  const [dosesAvailable, setDosesAvailable] = useState(location.state.props[3]);
  const cityList = useRef(location.state.cityList);
  const [snackbarVisiblity, setSnackbarVisiblity] = useState(false);
  const [loaderVisiblity, setLoaderVisiblity] = useState(false);

  /**
   * This function handles the city selection change
   *
   * @param {e} Pointerevent
   */
  const handleCityChange = (e) => {
    setCity(e.target.value);
    let val =
      currentState[location.state.country][location.state.state][
        e.target.value
      ];
    setPopulation(val.Population);
    setVaccinated(val.Vaccinated);
    setDosesAvailable(val["Doses Available"]);
  };

  const handlePopulationChange = (e) => {
    setPopulation(e.target.value);
  };

  const handleVaccinatedChange = (e) => {
    setVaccinated(e.target.value);
  };

  const handleDosesChange = (e) => {
    setDosesAvailable(e.target.value);
  };

  const onSaveHandler = () => {
    console.log(location.state);
    UpdateState();
  };

  const onCancelHandler = () => {
    //goToPage1();
    setCancelPopupVisiblity(true);
  };

  const [cancelPopupVisiblity, setCancelPopupVisiblity] = useState(false);
  const [validationPopupVisiblity, setValidationPopupVisiblity] =
    useState(false);
  const validationMessage = useRef("");

  /**
   * This function validates the entered data during save operation
   *
   * @param {return} boolean
   */
  const validate = () => {
    if (parseInt(location.state.props[2]) > parseInt(vaccinated)) {
      validationMessage.current =
        "Vaccinated can never be less than previous value";
      return false;
    } else if (
      parseInt(population) < 0 ||
      parseInt(population) < 0 ||
      parseInt(dosesAvailable) < 0
    ) {
      validationMessage.current = "Values can never be negative";
      return false;
    } else {
      return true;
    }
  };

  /**
   * This function will be triggered on successfull save
   */
  const postSaveActions = () => {
    setLoaderVisiblity(false);
    setSnackbarVisiblity(true);
  };

  const dispatch = useDispatch();

  /**
   * This function updates the state if validation is sucess
   */
  const UpdateState = () => {
    if (validate()) {
      let updatedState = dispatch(
        updateState({
          country: location.state.country,
          state: location.state.state,
          city: city,
          payload: {
            Population: population,
            Vaccinated: vaccinated,
            "Doses Available": dosesAvailable,
          },
        })
      );
      location.state.props[2] = parseInt(vaccinated);
      //validationMessage.current = "Successfully saved!";
      //setValidationPopupVisiblity(true);
      setLoaderVisiblity(true);
      console.log("Updated State - ", updatedState);
      setTimeout(() => postSaveActions(), 2000);
      //goToPage1();
    } else {
      setValidationPopupVisiblity(true);
    }
  };

  /**
   * This function navigates to page1
   */
  const goToPage1 = () => {
    history.push("/", {
      country: location.state.country,
      state: location.state.state,
    });
  };

  return (
    <div>
      {loaderVisiblity && (
        <div className="loader">
          <CircularProgress className="spinner" />
        </div>
      )}
      <div
        className={
          loaderVisiblity ? "parent-container-blur" : "parent-container"
        }
      >
        {snackbarVisiblity && (
          <Snackbar
            open={snackbarVisiblity}
            close={setSnackbarVisiblity}
            severity="success"
            message="Data successfully saved to database!"
          />
        )}
        <Popup
          open={cancelPopupVisiblity}
          close={!cancelPopupVisiblity}
          header="Alert!"
          content={
            "Do you really want to go back? All unsaved changes will be lost"
          }
          leftBtn="Close"
          rightBtn="Go Back"
          leftBtnHandler={() => setCancelPopupVisiblity(false)}
          rightBtnHandler={() => goToPage1()}
        />
        <Popup
          open={validationPopupVisiblity}
          close={!validationPopupVisiblity}
          header="Alert!"
          content={validationMessage.current}
          rightBtn="Okay"
          rightBtnHandler={() => setValidationPopupVisiblity(false)}
        />
        <BreadcrumComponent
          data={[
            {
              label: "Home",
              href: onCancelHandler.bind(this),
            },
            { label: "Edit" },
          ]}
        />
        <Grid
          style={{ marginBottom: "10px", marginTop: "10px" }}
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Label className="label">City</Label>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Select
              id="City"
              values={cityList.current}
              value={city}
              onChange={handleCityChange}
              className="select-box"
            />
          </Grid>
        </Grid>
        <Grid
          style={{ marginBottom: "10px", marginTop: "10px" }}
          container
          spacing={2}
        >
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Label className="label">Population</Label>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <TextField
              className="text-field"
              label="Population"
              value={population}
              onChange={handlePopulationChange}
              type="number"
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          style={{ marginBottom: "10px", marginTop: "10px" }}
          container
          spacing={2}
        >
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Label className="label">Vaccinated</Label>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <TextField
              className="text-field"
              label="Vaccinated"
              value={vaccinated}
              onChange={handleVaccinatedChange}
              type="number"
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          style={{ marginBottom: "10px", marginTop: "10px" }}
          container
          spacing={2}
        >
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Label className="label">Doses Available</Label>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <TextField
              className="text-field"
              label="Doses Available"
              value={dosesAvailable}
              onChange={handleDosesChange}
              type="number"
            ></TextField>
          </Grid>
        </Grid>

        <div className="btn-container">
          <div className="button">
            <Button
              variant="contained"
              text="Save"
              onClick={onSaveHandler}
            ></Button>
          </div>
          <div className="button">
            <Button
              variant="outlined"
              text="Cancel"
              onClick={onCancelHandler}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page2;
