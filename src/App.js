import React from "react";
import "./App.css";
import { Person } from "./models";
import { DataStore } from "@aws-amplify/datastore";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { Amplify } from "aws-amplify";
import { Authenticator, SignIn } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);

const postPerson = async () => {
  try {
    const post = await DataStore.save(
      new Person({
        name: "Sebas",
        number: "1234567891",
        visit: "1999-01-26T00:00:00.000Z", // AWS Date
        birthday: "2024-08-24", // AWS DateTime
      })
    );
    console.log("Post saved successfully!", post);
  } catch (error) {
    console.log("Error saving post", error);
  }
};

const getCurrentDateTimeInMexico = () => {
  const timeZone = "America/Mexico_City"; // Zona horaria de Ciudad de México
  const now = new Date(); // Obtén la fecha y hora actuales en UTC
  const zonedDate = toZonedTime(now, timeZone); // Convierte a la zona horaria de México
  return formatInTimeZone(zonedDate, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};

const queryPerson = async () => {
  try {
    const posts = await DataStore.query(Person);
    console.log(posts);
    console.log(
      "Posts retrieved successfully!",
      JSON.stringify(posts, null, 2)
    );

    const currentDateTimeInMexico = getCurrentDateTimeInMexico();
    console.log(currentDateTimeInMexico);
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
};

const updatePerson = async () => {
  const CURRENT_ITEM = await DataStore.query(
    Person,
    "6c96badb-e948-44fd-8980-70821ac68fcc"
  );
  await DataStore.save(
    Person.copyOf(CURRENT_ITEM, (item) => {
      item.name = "Jose";
    })
  );
};

const deletePerson = async () => {
  const modelToDelete = await DataStore.query(
    Person,
    "654f987e-e9a7-480d-8723-0d61147d1903"
  );
  DataStore.delete(modelToDelete);
};

function App({ signOut, user }) {
  return (
    <div className="App">
      <div>
        <h1>Hello {user.username}</h1>
        <h4>Primero es intalar el CLI: npm i -g @aws-amplify/cli</h4>
        <h4>
          En Data, se va a GrapQL API settings, se activa el Conflicts
          resolution, se regresa con Back to Data Modeling y se presiona Save
          and Deploy
        </h4>
        <h4>Despues se conecta con el amplify que se quiera</h4>
        <h4>Se intala amplify: npm install aws-amplify </h4>
        <h4>
          Para cognito, lo configuras y hacer el pull, despues instalas los ui:
          npm install aws-amplify @aws-amplify/ui-react
        </h4>

        <div>
          <button onClick={postPerson}>Post</button>
          <button onClick={queryPerson}>Query</button>
          <button onClick={updatePerson}>Update</button>
          <button onClick={deletePerson}>Delete</button>
        </div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}

function AppWithAuth() {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => <App signOut={signOut} user={user} />}
    </Authenticator>
  );
}

export default AppWithAuth;
