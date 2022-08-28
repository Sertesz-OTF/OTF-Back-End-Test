const hubspotClient = require("./hubspotdb");

const crud = {};
const tableIdOrName = "developer_test_5";


//Return all registers
crud.ListRegisters = async (req, res) => {
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(
      tableIdOrName
    );
    return res.status(200).json(apiResponse.results);
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

//Create register
crud.Create = async (req, res) => {
  try {
    const { name, last_name, document_id } = req.body;
    const data = {
      values: {
        name,
        last_name,
        document_id,
      },
    };
    await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableIdOrName, data);
    await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableIdOrName);
    return res.status(200).json({ message: "Register created succesfully" });
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

//Delete register with a given id
crud.Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const row = await hubspotClient.cms.hubdb.rowsApi.getTableRow(
      tableIdOrName,
      id
    );
    if (row) {
      await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(
        tableIdOrName,
        id
      );
      await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableIdOrName);
    }
    return res.status(200).json({ message: "Register deleted succesfully" });
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

//Return one register with a given id
crud.GetRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await hubspotClient.cms.hubdb.rowsApi.getTableRow(
      tableIdOrName,
      id
    );
    return res.status(200).json(data);
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

//Update register in DB
crud.Update = async (req, res) => {
  try {
    const { id } = req.params;
    const register = await hubspotClient.cms.hubdb.rowsApi.getTableRow(
      tableIdOrName,
      id
    );
    if (register) {
      const { name, last_name, document_id } = req.body;
      const data = {
          values: {
              name,
              last_name,
              document_id
          }
      }
      await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableIdOrName, id, data)
      await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableIdOrName)
      return res.status(200).json({message: "Register updated succesfully"})
  }
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
}

module.exports = crud;
