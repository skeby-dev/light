const mysql = require("mysql2");

const connection = mysql.createConnection({
   user: "root",
   password: "daniel1&",
   database: "light_bot",
});

connection.connect((err) => {
   if (err) {
      console.error("Error connecting to MYSQL database:", err);
      return;
   }
   console.log("Connected to MySQL database!");
});

function logUser(values) {
    const insertDataQuery = `
       INSERT INTO users (user_id, first_name, user_name, first_interaction)
       VALUES(?, ?, ?, ?);
    `;
 
    connection.query(insertDataQuery, values, (error, results, fields) => {
       if (error) {
          if (error.code === "ER_DUP_ENTRY") {
             console.error("User already exists in database");
          } else {
             console.log(error);
          }
       } else {
          console.log("Data inserted successfully.");
       }
    });
 }

 async function logPQs(ctx, values) {
    try {
       if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
          const insertDataQuery = `
             INSERT INTO accpq_100(
                file_id,
                unique_file_id,
                file_name,
                file_type,
                hastag,
                group_name
             )VALUES(?, ?, ?, ?, ?, ?);
          `;
 
          connection.query(
             insertDataQuery,
             values,
             async (error, result, fields) => {
                if (error) {
                   if (error.sqlMessage === "Column 'hastag' cannot be null") {
                      console.error(error);
                      getHashTag(ctx);
                      ctx.reply("please add required hashtag");
                   } else if (
                      error.sqlMessage ===
                      `Duplicate entry '${values[2]}' for key 'accpq_100.file_name'`
                   ) {
                      await ctx.reply(
                         `Can't record  ${values[2]} because it already exists in database. if you are certain document contains different information. please kindly rename `
                      );
                   } else {
                      ctx.reply(
                         `${values[2]} not recorded, try again later or contact developer`
                      );
                      console.error("Error inserting data:", error);
                   }
                } else {
                   console.log(`${values[2]} recorded successfully.`);
                   if (!ctx.session.recordResult) {
                      ctx.reply("Documents recorded sucessfully");
                      ctx.session.recordResult = "sucessful"
                   } 
                }
             }
          );
       }
    } catch (error) {
       console.error("Can't log pqs");
       ctx.reply("Sorry can't log pqs");
    }
 }


 module.exports = {connection, logUser, logPQs};