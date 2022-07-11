import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { getStudentMembership } from "src/services/user.services";
import { useAuthContext } from "src/context/AuthContext";
import { toast } from "react-toastify";
import { paymentMembership } from "src/services/common.services";

const useStyles = makeStyles((theme) => ({
  root: {
    //PUT SOME CSS HERE (WITH camelCase for property and string for value)
    height: '300px',
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",

  },
  formPayment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '50px'
  },

  regButton: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const optionsClass = [
  {
    num: 1,
    content: 'One 1-1 class per week'
  },
  {
    num: 2,
    content: 'Two 1-1 class per week'
  },
  {
    num: 3,
    content: 'Three 1-1 class per week'
  },
  {
    num: 4,
    content: 'Four 1-1 class per week'
  },
  {
    num: 5,
    content: 'Five 1-1 class per week'
  },
  {
    num: 6,
    content: 'Six 1-1 class per week'
  },
  {
    num: 7,
    content: 'Seven 1-1 class per week'
  }
]

const paymentGroup = [
  {
    type: 'month',
    content: 'Register with one month membership'
  },
  {
    type: 'quarter',
    content: 'Register with three months membership'
  },
  {
    type: 'year',
    content: 'Register with a whole year membership'
  }
]

const MemberShip = () => {
  const classes = useStyles();
  const auth = useAuthContext()
  const currentUser = JSON.parse(auth.user)
  const [loading, setLoading] = useState(false)
  const [studentMembership, setStudentMembership] = useState(undefined)
  const [selectedClasses, setSelectedClasses] = useState({
    num: 1,
    content: 'One 1-1 class per week'
  })

  const [selectedPayment, setSelectedPayment] = useState({
    type: 'month',
    content: 'Register with one month membership'
  })

  const getMembership = async () => {
    setLoading(true)
    const { status, data } = await getStudentMembership(currentUser.id)
    if (status === 200) {
      if (data.membershipType !== 'free') {
        setStudentMembership(data)
      }
    } else {
      toast.error('Something went wrong, please try again later')
      // history.push('/404')
    }
    setLoading(false)
  }

  useEffect(() => {
    getMembership()
  }, [])

  const convertDateToLocale = (date) => {
    return new Date(date).toLocaleString()
  }

  const mapTypePayment = (type) => {
    if (type === 'month') return 1
    if (type === 'quarter') return 3 * 0.95
    if (type === 'year') return 12 * 0.9
  }

  const mapTypeDateRangeToNumber = () => {
    if (selectedClasses && selectedPayment) {
      if (selectedPayment.type === 'month') return 1
      if (selectedPayment.type === 'quarter') return 3
      if (selectedPayment.type === 'year') return 12
    }
    return 1
  }

  const countTotal = () => {
    if (selectedClasses && selectedPayment) {
      return Math.round((selectedClasses.num * 12) * 4 * mapTypePayment(selectedPayment.type))
    } else {
      return 0
    }
  }

  const handleRegisterMembership = async () => {
    const line_items =
      [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedPayment.type + " - " + selectedClasses.content,
            },
            unit_amount: countTotal() * 100,
          },
          quantity: 1,
        },
      ]
    let validMembership = new Date()
    validMembership.setMonth(new Date().getMonth() + mapTypeDateRangeToNumber())
    validMembership = validMembership.toISOString().split('.')[0] + "Z"
    const { status, data } = await paymentMembership(line_items, currentUser.id, selectedPayment.type, selectedClasses.num, validMembership)
    if (status === 200) {
      window.open(data.url, "_blank")
    } else {
      toast.error('Something went wrong, please try again later')
    }

    // console.log(validMembership)
  }

  return (
    // LEFT SECTION WITH 1 AUTOCOMPLETE TO CHOOSE NUMBER OF 1-1 CLASS / WEEK
    // WRIGHT SECTION WITH  3 CHECKBOXES TO CHOOSE TYPE OF SUBSCRIPTION (WEEK MONTH YEAR WITH PRICE)
    // REGISTER BUTTON

    <>
      {
        loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
          <>
            {
              studentMembership && studentMembership.membershipType !== 'free' ?
                (
                  <>
                    <p>{'Your Membership is valid until ' + convertDateToLocale(studentMembership.validMembership)}</p>
                  </>
                )
                :
                (
                  <div className={classes.root}>
                    <div className={classes.formPayment}>
                      <h3 style={{ marginBottom: '40px' }}>Choose your type of membership</h3>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Autocomplete
                            disablePortal
                            fullWidth
                            options={optionsClass}
                            getOptionLabel={op => op.content}
                            id="num-of-class"
                            renderInput={(params) => (
                              <TextField fullWidth {...params} label="Select number of classes per week" />
                            )}
                            value={selectedClasses}
                            onChange={(e, newValue) => setSelectedClasses(newValue)}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            disablePortal
                            id="payment-group"
                            options={paymentGroup}
                            getOptionLabel={group => group.content}
                            renderInput={(params) => (
                              <TextField {...params} label="Select payment group" />
                            )}
                            value={selectedPayment}
                            onChange={(e, newValue) => setSelectedPayment(newValue)}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.regButton}>
                      <p>{'Calculated Payment - Total: ' + countTotal() + '$ - Per month: ~ ' + Math.round(countTotal() / mapTypeDateRangeToNumber()) + '$'}</p>
                      <Button onClick={() => handleRegisterMembership()} variant="outlined">Register Membership</Button>
                    </div>
                  </div>
                )
            }
          </>
        )
      }
    </>
  );
};

export default MemberShip;
