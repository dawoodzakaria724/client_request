const express = require("express");
const router = express.Router();

function createRouter(db) {
  // routes are defined here
  // add employee
  const employeeAdd = async (req, res, next) => {
    try {
      const [result] = await db.query(
        "INSERT INTO employees (employee_id, last_name, first_name, roles, manager) VALUES (:employee_id,:last_name, :first_name, :roles, :manager)",
        {
          employee_id: req.body.employee_id,
          last_name: req.body.last_name,
          first_name: req.body.first_name,
          roles: req.body.roles,
          manager: req.body.manager,
        }
      );
      await db.commit();
      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", err });
    }
  };

  // view employees and return an array
  const employeeView = async (req, res) => {
    const result = await db.query(
      "SELECT * FROM employees WHERE manager = :manager",
      { manager: req.body.manager }
    );
    // result[0] returns the data we need
    res.send(result[0]);
  };

  router.post("/employee/add", employeeAdd);
  router.post("/employee/view", employeeView);

  return router;
}

module.exports = createRouter;
