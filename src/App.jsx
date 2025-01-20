import { useEffect, useState } from 'react'
import './App.css'
import { createDataAPI, deleteDataAPI, getDataAPI, updateDataAPI } from './services/allAPI'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'

function App() {

  const [allData, setAllData] = useState([])
  const [data, setData] = useState({
    name: "", details: ""
  })
  const [isUpdate, setIsUpdate] = useState(false)

  const [open, setOpen] = useState(false);

  const getAllData = async () => {
    try {
      const response = await getDataAPI();
      console.log(response.data)
      if (response.status >= 200 && response.status < 300) {
        setAllData(response.data)
      } else {
        alert("Network Error!")
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData();
  }, [])

  const handleCreate = async () => {
    setIsUpdate(false)
    if (data.name && data.details) {
      try {
        const response = await createDataAPI(data);
        if (response.status >= 200 && response.status < 300) {
          alert("data Added!!")
          handleClose()
          setData({ name: "", details: "" }); // Clear data only after success
          getAllData(); // Refresh data after adding
        } else {
          alert("data not added server error try Again!")
          return
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Please fill all the data")
      return;
    }
  }

  const handleUpdate = async () => {
    try {
      const response = await updateDataAPI(data);
      if (response.status >= 200 && response.status < 300) {
        alert("data Updated!!")
        handleClose()
        setData({ name: "", details: "" }); // Clear data only after success
      } else {
        alert("data not updated server error try Again!")
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?")
      if (confirm) {
        const response = await deleteDataAPI(id);
        if (response.status >= 200 && response.status < 300) {
          alert("Data Deleted!!")
          getAllData()
        } else {
          alert("data not deleted server error try Again!")
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center px-32 bg-slate-300'>
        <div className='flex justify-start w-full'><button onClick={handleClickOpen} className='p-3 bg-black shadow-2xl text-white text-xl font-bold rounded'>Add Data</button></div>
        {/* display data */}
        <div className='mt-12 flex justify-center w-full drop-shadow-2xl'>
          <TableContainer sx={{ maxWidth: '80%', }} component={Paper}>
            <Table sx={{ minWidth: 650, background: "black" }} aria-label="simple table" className='text-center text-white'>
              <TableHead className=''>
                <TableRow>
                  <TableCell sx={{ color: "white", fontSize: "1.4rem" }}>Id</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.4rem" }}>Name</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.4rem" }}>Details</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "1.4rem" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <tbody>
                {
                  allData?.length > 0 ?
                    allData?.map(data => (
                      <TableRow key={data?.id}>
                        <TableCell sx={{ color: "white", fontSize: "1.2rem" }}>{data?.id}</TableCell>
                        <TableCell sx={{ color: "white", fontSize: "1.2rem" }}>{data?.name}</TableCell>
                        <TableCell sx={{ color: "white", fontSize: "1.2rem" }}>{data?.details}</TableCell>
                        <TableCell sx={{ color: "white", fontSize: "1.2rem" }}>
                          <button className='p-3 mx-2 bg-green-800 rounded' onClick={() => {
                            setIsUpdate(true)
                            handleClickOpen()
                            setData({ name: data?.name, details: data?.details, id: data?.id })
                          }}>UPDATE</button>
                          <button className='p-3 mx-2 bg-red-800 rounded' onClick={() => handleDelete(data?.id)}>DELETE</button>
                        </TableCell>
                      </TableRow>
                    ))
                    :
                    <TableRow >
                      <TableCell sx={{ textAlign: "center" }} colSpan={4}>You haven't added any data yet</TableCell>
                    </TableRow>
                }
              </tbody>
            </Table>
          </TableContainer>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              onSubmit: (event) => {
                event.preventDefault();
                isUpdate ? handleUpdate(data) : handleCreate();
              }
            }}
          }
            >
          <DialogTitle>Add Data</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Enter Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={e => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="details"
              label="Enter Details"
              type="text"
              fullWidth
              variant="standard"
              onChange={e => setData({...data, details: e.target.value })}
              value={data.details}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={isUpdate ? handleUpdate : handleCreate}>{isUpdate ? "Update" : "Create"}</Button>
          </DialogActions>
        </Dialog>
    </div >
    </>
  )
}

export default App
