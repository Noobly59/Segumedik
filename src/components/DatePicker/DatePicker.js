import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "react-native-rapi-ui";
import moment from "moment";

export default function DatePicker(props) {
  const { initialYear, setDate, minDate, maxDate, formikValue } = props;
  const [yearPickerValue, setYearPickerValue] = useState(null);
  const [monthPickerValue, setMonthPickerValue] = useState(null);
  const [dayPickerValue, setDayPickerValue] = useState(null);
  const [yearItemsArray, setYearItemsArray] = useState([]);
  const [monthItemsArray, setMonthItemsArray] = useState([]);
  const [dayItemsArray, setDayItemsArray] = useState([]);
  const [monthView, setMonthView] = useState("none");
  const [dayView, setDayView] = useState("none");

  useEffect(() => {
    yearItems();
  }, []);

  useEffect(() => {
    getDaysArrayByMonth();
    let minMonth;
    let maxMonth;
    let shortMonths;
    let shortMaxMonths;
    minDate
      ? ((minMonth = new Date(minDate)),
        minMonth.getFullYear() == yearPickerValue
          ? ((shortMonths = monthItems),
            (maxMonth = new Date(maxDate)),
            maxMonth.getFullYear() == yearPickerValue
              ? (shortMonths.splice(
                  minMonth.getMonth() + 1 == maxMonth.getMonth()
                    ? maxMonth.getMonth()
                    : maxMonth.getMonth() + 1,
                  12 - maxMonth.getMonth()
                ),
                shortMonths.splice(0, minMonth.getMonth()),
                setMonthItemsArray(shortMonths))
              : (shortMonths.splice(0, minMonth.getMonth()),
                setMonthItemsArray(shortMonths)))
          : ((maxMonth = new Date(maxDate)),
            maxMonth.getFullYear() == yearPickerValue
              ? ((shortMaxMonths = monthItems),
                shortMaxMonths.splice(
                  maxMonth.getMonth() + 1,
                  11 - maxMonth.getMonth()
                ),
                setMonthItemsArray(shortMaxMonths))
              : setMonthItemsArray(monthItems)))
      : setMonthItemsArray(monthItems);

    if (monthPickerValue != null && dayPickerValue != null) {
      const pickedDate = moment(
        `${yearPickerValue}-${monthPickerValue}-${dayPickerValue}`,
        "YYYY-MM-DD"
      );
      setDateValue(pickedDate);
    }
  }, [yearPickerValue]);

  useEffect(() => {
    // setDayPickerValue(null);
    if (dayPickerValue != null) {
      const pickedDate = moment(
        `${yearPickerValue}-${monthPickerValue}-${dayPickerValue}`,
        "YYYY-MM-DD"
      );
      setDateValue(pickedDate);
    }
    getDaysArrayByMonth();
  }, [monthPickerValue]);

  useEffect(() => {
    const pickedDate = dayPickerValue
      ? moment(
          `${yearPickerValue}-${monthPickerValue}-${dayPickerValue}`,
          "YYYY-MM-DD"
        )
      : null;
    setDateValue(pickedDate);
  }, [dayPickerValue]);

  const setDateValue = (pickedDate) => {
    minDate
      ? moment(minDate).isAfter(pickedDate)
        ? setDate(formikValue, null)
        : (setDate(formikValue, pickedDate),
          maxDate
            ? moment(maxDate).isBefore(pickedDate)
              ? setDate(formikValue, null)
              : setDate(formikValue, pickedDate)
            : setDate(formikValue, pickedDate))
      : setDate(formikValue, pickedDate);
  };

  const years = (back) => {
    const year = new Date().getFullYear();
    return Array.from({ length: back }, (v, i) => year - back + i + 1);
  };

  const yearItems = () => {
    let yearsArray = minDate
      ? getYearRange(minDate, maxDate, "years")
      : years(initialYear);

    let itemsArray = [];
    for (const year of yearsArray) {
      itemsArray.push({
        label: `${year}`,
        value: `${year}`,
      });
    }
    setYearItemsArray(itemsArray);
  };

  const monthItems = [
    { label: "Enero", value: "01" },
    { label: "Febrero", value: "02" },
    { label: "Marzo", value: "03" },
    { label: "Abril", value: "04" },
    { label: "Mayo", value: "05" },
    { label: "Junio", value: "06" },
    { label: "Julio", value: "07" },
    { label: "Agosto", value: "08" },
    { label: "Septiembre", value: "09" },
    { label: "Octubre", value: "10" },
    { label: "Noviembre", value: "11" },
    { label: "Diciembre", value: "12" },
  ];

  const setYear = (year) => {
    setYearPickerValue(year);
    setMonthView("auto");
  };

  const setMonth = (month) => {
    setMonthPickerValue(month);
    setDayView("auto");
  };

  const setDay = (day) => {
    setDayPickerValue(day);
  };

  const getDaysArrayByMonth = () => {
    setDayItemsArray([]);
    let daysInMonth = 0;
    let maxDays;
    if (maxDate != null) {
      maxDays = new Date(maxDate);
      if (
        maxDays.getFullYear() == yearPickerValue &&
        maxDays.getMonth() + 1 == parseInt(monthPickerValue)
      ) {
        daysInMonth = maxDays.getDate() + 1;
      } else {
        daysInMonth = moment(
          `${yearPickerValue}-${monthPickerValue}`,
          "YYYY-MM"
        ).daysInMonth();
      }
    } else {
      daysInMonth = moment(
        `${yearPickerValue}-${monthPickerValue}`,
        "YYYY-MM"
      ).daysInMonth();
    }

    let itemsArray = [];
    let days = 1;
    while (daysInMonth >= days) {
      itemsArray.push({
        label: `${days}`,
        value: `${days}`,
      });
      days++;
    }
    let minDays;
    let shortDays;
    minDate
      ? ((minDays = new Date(minDate)),
        minDays.getFullYear() == yearPickerValue &&
        minDays.getMonth() + 1 == parseInt(monthPickerValue)
          ? ((shortDays = itemsArray),
            shortDays.splice(0, minDays.getDate()),
            setDayItemsArray(shortDays))
          : setDayItemsArray(itemsArray))
      : setDayItemsArray(itemsArray);
  };

  const getYearRange = (startDate, endDate, type) => {
    let fromDate = new Date(startDate);
    let toDate = new Date(endDate);
    let diff = toDate.getFullYear() - fromDate.getFullYear();
    let range = [];
    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type).year());
    }
    return range;
  };

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.picker}>
        <Picker
          items={yearItemsArray}
          value={yearPickerValue}
          placeholder="Seleccione año"
          onValueChange={(val) => setYear(val)}
        />
      </View>
      <View style={styles.monthPicker} pointerEvents={`${monthView}`}>
        <Picker
          items={monthItemsArray}
          value={monthPickerValue}
          placeholder="Seleccione mes"
          onValueChange={(val) => setMonth(val)}
        />
      </View>
      <View style={styles.picker} pointerEvents={`${dayView}`}>
        <Picker
          items={dayItemsArray}
          value={dayPickerValue}
          placeholder="Seleccione dia"
          onValueChange={(val) => setDay(val)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: { flex: 1, flexDirection: "row" },

  picker: { flex: 1 },
  monthPicker: { flex: 1, marginHorizontal: 4 },
});

DatePicker.defaultProps = {
  initialYear: new Date().getFullYear() - 2014,
  minDate: null,
  maxDate: null,
};
