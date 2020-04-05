import React from 'react';
import  './Form.scss';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Errors} from '../Errors/Errors';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';


const validationSchema = Yup.object().shape({
	name : Yup.string()
		.min(1, "Must have a character")
		.max(255, "Must be shorter than 255")
		.required("Must enter a name"),
	email : Yup.string()
		.email("Must be a valid email adress")
		.max(255, "Must be shorter than 255")
		.required("Must enter an email"),
	country : Yup.string().required("Must choose country")
})

const FormikForm = () => {
	const [country, setCountry] = React.useState("");
	const [suggestions, setSuggestions] = React.useState([]);

	return (
		<Formik 
			initialValues={{name: '', email: '', country:''}} 
			validationSchema={validationSchema}
			onSubmit={(values, {setSubmitting, resetForm}) => {
				console.log("Form is submitted")
				setSubmitting(true);

				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					resetForm();
					setSubmitting(false);
				}, 10000);
			}} 
		>
			{({
				values, 
				errors, 
				touched, 
				handleChange, 
				handleBlur, 
				handleSubmit, 
				isSubmitting,
				setFieldValue
			}) => (
				<form onSubmit={handleSubmit}>
					<h3> Log in </h3>
					<div>
						<label htmlFor="name">Name</label>
						<input 
							type="text"
							name="name"
							id="name"
							placeholder="Enter your name"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
							className={touched.name && errors.name ? "has-error" : null}
						/>
						<Errors touched={touched.name} message={errors.name} />
					</div>


					<div>
						<label htmlFor="email">Email</label>
						<input 
							type="text"
							name="email"
							id="email"
							placeholder="Enter your email"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							className={touched.email && errors.email ? "has-error" : null}
						/>
						<Errors touched={touched.email} message={errors.email} />
					</div>

					<div>
						<label htmlFor='country'>Country</label>
						<Autosuggest  inputProps={{
								placeholder: "Type your country",
								autoComplete: "abcs",
								name: "country",
								id: "country",
								value: country,
								onChange : (_event, {newValue}) => {
									setCountry(newValue);
								},
								className : errors.country && touched.country ? "has-error" : null,

							}} 
								suggestions={suggestions}
								onSuggestionsFetchRequested={ async ({value}) => {
									if (!value) {
										setSuggestions([]);
										return;
									}
									try {
										const result = await axios.get(`https://restcountries.eu/rest/v2/name/${value}`);
										setSuggestions(result.data.map( row => ({
											name: row.name,
											flag: row.flag
										})));
									} catch(err) {
										setSuggestions([]);
									}
								}}
								onSuggestionSelected={(_event, {suggestion, method}) => {
									if (method === "enter") {
										_event.preventDefault();
									}
									setCountry(suggestion.name);
									setFieldValue("country", suggestion.name)
								}}
								onSuggestionsClearRequested={() => {
									setSuggestions([]);
								}}
								getSuggestionValue={ suggestion => suggestion.name}
								renderSuggestion={ suggestion => <div>{suggestion.name}</div>}
						/>
						<Errors touched={touched.country} message={errors.country} />
					</div>

					<div>
						<button type="submit" disabled={isSubmitting}>Submit</button>
					</div>
				</form>
			)}
		
		</Formik>

	)




}









export {FormikForm}