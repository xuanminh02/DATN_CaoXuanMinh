import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Paper,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import get_all_user from 'api/get/get_all_user';
import update_user from 'api/put/update_user';
import swal from 'sweetalert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import update_user_password from 'api/put/update_user_password';
import update_user_balance from 'api/put/update_user_balance';
import delete_user from 'api/delete/delete_user';
import moment from 'moment';
import update_user_bank from 'api/put/update_user_banking';
import get_all_user_banking from 'api/get/get_all_user_banking';

const MemberManagementBank = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [change, setChange] = useState(false);
  const [newBalance, setNewBalance] = React.useState('');
  const [newPassword, setNewPassword] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const handleChangeNewBalance = (event) => {
    setNewBalance(event.target.value);
  };
  const fetchMembers = async (page = 1, term = '') => {
    try {
      const result = await get_all_user_banking({ page, search: term });
      setMembers(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchMembers(currentPage, searchTerm);
    };

    // Gọi fetchData lần đầu tiên
    fetchData();

    // Thiết lập một interval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, [currentPage, searchTerm, change]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchMembers(1, searchTerm);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (member, type) => {
    setSelectedMember(member);
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedMember(null);
    setDialogType('');
    setDialogOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setNewPassword({ ...newPassword, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setNewPassword({ ...newPassword, showPassword: !newPassword.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setNewPassword({ ...newPassword, showConfirmPassword: !newPassword.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdateInfo = async () => {

    try {
      const result = await update_user_bank(selectedMember);
      if (result?.ok === true) {
        swal('Thông báo', result?.message, 'success').then(() => {
          handleCloseDialog();
          setChange((prev) => !prev);
          setSelectedMember(null);
        });
      }
    } catch (error) {
        console.log(error)
      swal('Thông báo', error?.response?.data?.message, 'error');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (newPassword.password !== newPassword.confirmPassword) {
        return swal('Thông báo', 'Mật khẩu không khớp, vui lòng nhập đúng', 'error');
      }
      const result = await update_user_password({ ...selectedMember, ...newPassword });
      if (result?.ok === true) {
        swal('Thông báo', result?.message, 'success').then(() => {
          handleCloseDialog();
          setChange((prev) => !prev);
          setSelectedMember(null);
          setNewPassword({
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false
          });
        });
      }
    } catch (error) {
      swal('Thông báo', error?.response?.data?.message, 'error');
    }
  };

  const handleUpdateBalance = async () => {
    try {
      const result = await update_user_balance({ ...selectedMember, balance: newBalance });
      if (result?.ok === true) {
        swal('Thông báo', result?.message, 'success').then(() => {
          handleCloseDialog();
          setChange((prev) => !prev);
          setSelectedMember(null);
          setNewPassword({
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false
          });
        });
      }
    } catch (error) {
      swal('Thông báo', error?.response?.data?.message, 'error').then(() => {
        setSelectedMember(null);
        setNewBalance('');
      });
    }
  };

  const handleDeleteMember = async () => {
    try {
      const result = await delete_user(selectedMember);
      if (result?.ok === true) {
        swal('Thông báo', result?.message, 'success').then(() => {
          handleCloseDialog();
          setChange((prev) => !prev);
          setSelectedMember(null);
        });
      }
    } catch (error) {
      swal('Thông báo', error?.response?.data?.message, 'error').then(() => {
        setSelectedMember(null);
        handleCloseDialog();
      });
    }
  };

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'edit':
        return (
          <>
            <DialogContent>
              <DialogContentText style={{ fontSize: 18, color: 'black', marginBottom: 12 }}>
                Chỉnh sửa thông tin cho {selectedMember.username}
              </DialogContentText>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ minWidth: 100, color: 'black' }}>Tài khoản hội viên: </div>
                <div style={{ color: 'black' }}>{selectedMember.username}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ minWidth: 100, color: 'black' }}>Tên hội viên: </div>
                <div style={{ color: 'black' }}>{selectedMember.username}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ minWidth: 100, color: 'black' }}>Tên ngân hàng: </div>
                <FormControl sx={{ width: 150 }}>
                  <InputLabel>Tên ngân hàng</InputLabel>
                  <Select
                    value={selectedMember?.bank_name}
                    onChange={(e) => setSelectedMember({ ...selectedMember, bank_name: e.target.value })}
                    label="Tên ngân hàng"
                  >
                    <MenuItem value="ABBANK">ABBANK</MenuItem>
                    <MenuItem value="ABBANK">ABBANK</MenuItem>
                    <MenuItem value="ACB">ACB</MenuItem>
                    <MenuItem value="AGRIBANK">AGRIBANK</MenuItem>
                    <MenuItem value="BACABANK">BACABANK</MenuItem>
                    <MenuItem value="BaoVietBank">BaoVietBank</MenuItem>
                    <MenuItem value="BIDV">BIDV</MenuItem>
                    <MenuItem value="DONGABANK">DONGABANK</MenuItem>
                    <MenuItem value="EXIMBANK">EXIMBANK</MenuItem>
                    <MenuItem value="HDBANK">HDBANK</MenuItem>
                    <MenuItem value="HONGLEONGBANK">HONGLEONGBANK</MenuItem>
                    <MenuItem value="LienVietPostBank">LienVietPostBank</MenuItem>
                    <MenuItem value="MBBANK">MBBANK</MenuItem>
                    <MenuItem value="MSBBANK">MSBBANK</MenuItem>
                    <MenuItem value="NAMABANK">NAMABANK</MenuItem>
                    <MenuItem value="NCB BANK">NCB BANK</MenuItem>
                    <MenuItem value="OCB">OCB</MenuItem>
                    <MenuItem value="OCEANBANK">OCEANBANK</MenuItem>
                    <MenuItem value="pvbank">pvbank</MenuItem>
                    <MenuItem value="SACOMBANK">SACOMBANK</MenuItem>
                    <MenuItem value="SCBBANK">SCBBANK</MenuItem>
                    <MenuItem value="SEABANK">SEABANK</MenuItem>
                    <MenuItem value="SHBBANK">SHBBANK</MenuItem>
                    <MenuItem value="SHIHANBANK">SHIHANBANK</MenuItem>
                    <MenuItem value="TECHCOMBANK">TECHCOMBANK</MenuItem>
                    <MenuItem value="TPBANK">TPBANK</MenuItem>
                    <MenuItem value="VIBBANK">VIBBANK</MenuItem>
                    <MenuItem value="VIETABANK">VIETABANK</MenuItem>
                    <MenuItem value="vietbank">vietbank</MenuItem>
                    <MenuItem value="VietCapitalBank">VietCapitalBank</MenuItem>
                    <MenuItem value="VIETCOMBANK">VIETCOMBANK</MenuItem>
                    <MenuItem value="VIETINBANK">VIETINBANK</MenuItem>
                    <MenuItem value="VIETINBANK">VPBANK</MenuItem>
                    <MenuItem value="VIETINBANK">WOORI BANK</MenuItem>
                    {/* Add other bank options here */}
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ minWidth: 100, color: 'black' }}>Chi nhánh: </div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="branch"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  defaultValue={selectedMember.branch}
                  onChange={(e) => setSelectedMember({ ...selectedMember, branch: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ minWidth: 100, maxWidth: 100, color: 'black' }}>Số tài khoản ngân hàng: </div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="account_number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  defaultValue={selectedMember.account_number}
                  onChange={(e) => setSelectedMember({ ...selectedMember, account_number: e.target.value })}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdateInfo} variant="contained" color="primary">
                Xác nhận
              </Button>
              <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                Hủy bỏ
              </Button>
            </DialogActions>
          </>
        );
      case 'delete':
        return (
          <>
            <DialogContent>
              <DialogTitle>Xác nhận xoá thành viên</DialogTitle>
              <DialogContentText>Bạn có chắc chắn muốn xoá thành viên {selectedMember.username}?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteMember} variant="contained" color="primary">
                Xác nhận
              </Button>
              <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                Hủy bỏ
              </Button>
            </DialogActions>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="hidden"
            label="Tìm kiếm"
            variant="outlined"
            autoComplete="off"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                STT
              </TableCell>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                Tài khoản hội viên
              </TableCell>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                Tên ngân hàng
              </TableCell>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                Chi nhánh
              </TableCell>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                Tên hội viên
              </TableCell>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                Số tài khoản ngân hàng
              </TableCell>
              <TableCell
                align="center"
                style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}
              >
                Thời gian liên kết
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Sửa thời gian
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((member, key) => (
              <TableRow key={member.id}>
                <TableCell align="center" style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>
                  {parseInt(key) + parseInt(1)}
                </TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.username}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.bank_name}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.branch}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.account_name}</TableCell>
                <TableCell align="center" style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>
                  {member.account_number}
                </TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>
                  {moment(member.time_linking_bank).format('DD-MM-YYYY HH:mm:ss')}
                </TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>
                  {moment(member.time_update_bank).format('DD-MM-YYYY HH:mm:ss')}
                </TableCell>
                <TableCell style={{ display: 'flex' }}>
                  <Button variant="contained" style={{ margin: 5, whiteSpace: 'nowrap' }} onClick={() => handleOpenDialog(member, 'edit')}>
                    Sửa đổi
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 5, whiteSpace: 'nowrap' }}
                    onClick={() => handleOpenDialog(member, 'delete')}
                  >
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" variant="outlined" shape="rounded" />
      </Box>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="dialog-title" fullWidth>
        {/* <DialogTitle id="dialog-title">{dialogType}</DialogTitle> */}
        <DialogContent fullWidth>
          <DialogContentText>{selectedMember && renderDialogContent()}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MemberManagementBank;
