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
  InputAdornment
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
import update_user_fund_password from 'api/put/update_user_fund_password';

const MemberManagement = () => {
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
      const result = await get_all_user({ page, search: term });
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
      const result = await update_user(selectedMember);
      if (result?.ok === true) {
        swal('Thông báo', result?.message, 'success').then(() => {
          handleCloseDialog();
          setChange((prev) => !prev);
          setSelectedMember(null);
        });
      }
    } catch (error) {
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

  const handleUpdateFundPassword = async () => {
    try {
      if (newPassword.password !== newPassword.confirmPassword) {
        return swal('Thông báo', 'Mật khẩu không khớp, vui lòng nhập đúng', 'error');
      }
      const result = await update_user_fund_password({ ...selectedMember, ...newPassword });
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
              <DialogContentText>Chỉnh sửa thông tin cho {selectedMember.username}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Tên người dùng"
                type="text"
                fullWidth
                variant="outlined"
                required
                defaultValue={selectedMember.username}
                onChange={(e) => setSelectedMember({ ...selectedMember, username: e.target.value })}
              />
              <TextField
                margin="dense"
                id="account"
                label="Tên tài khoản"
                type="text"
                fullWidth
                variant="outlined"
                required
                defaultValue={selectedMember.account}
                onChange={(e) => setSelectedMember({ ...selectedMember, account: e.target.value })}
              />
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
      case 'resetPassword':
        return (
          <>
            <DialogContent>
              <DialogContentText>Thiết lập mật khẩu mới cho {selectedMember.username}</DialogContentText>
              <TextField
                margin="dense"
                id="password"
                label="Mật khẩu mới"
                type={newPassword.showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                required
                autoComplete="off"
                value={newPassword.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {newPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Xác nhận mật khẩu mới"
                type={newPassword.showConfirmPassword ? 'text' : 'password'}
                fullWidth
                autoComplete="off"
                variant="outlined"
                required
                value={newPassword.confirmPassword}
                onChange={handleChange('confirmPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {newPassword.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdatePassword} variant="contained" color="primary">
                Xác nhận
              </Button>
              <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                Hủy bỏ
              </Button>
            </DialogActions>
          </>
        );
      case 'resetFundPassword':
        return (
          <>
            <DialogContent>
              <DialogContentText>Thiết lập mật khẩu quỹ mới cho {selectedMember.username}</DialogContentText>
              <TextField
                margin="dense"
                id="password"
                label="Mật khẩu quỹ mới"
                type={newPassword.showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                required
                autoComplete="off"
                value={newPassword.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {newPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Xác nhận mật khẩu mới"
                type={newPassword.showConfirmPassword ? 'text' : 'password'}
                fullWidth
                autoComplete="off"
                variant="outlined"
                required
                value={newPassword.confirmPassword}
                onChange={handleChange('confirmPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {newPassword.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdateFundPassword} variant="contained" color="primary">
                Xác nhận
              </Button>
              <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                Hủy bỏ
              </Button>
            </DialogActions>
          </>
        );
      case 'updateBalance':
        return (
          <>
            <DialogContent>
              <DialogContentText>Nhập số dư mới cho {selectedMember.username}</DialogContentText>
              <TextField
                margin="dense"
                id="newBalance"
                label="Số dư mới"
                type="number"
                fullWidth
                variant="outlined"
                required
                value={newBalance}
                onChange={handleChangeNewBalance}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdateBalance} variant="contained" color="primary">
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
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Tên người dùng
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Tên tài khoản ngân hàng
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Số tài khoản ngân hàng
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Tên ngân hàng
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Chi nhánh
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Tên tài khoản
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Thời gian đăng ký
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Thời gian đăng nhập lần cuối
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                IP đăng nhập
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                IP đăng ký
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Số dư
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textTransform: 'none', fontSize: 14, paddingLeft: 60, paddingRight: 60 }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((member) => (
              <TableRow key={member.id}>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.username}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.account_name}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.account_number}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.bank_name}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.branch}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.account}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>
                  {moment(member.time_register).format('DD-MM-YYYY HH:mm:ss')}
                </TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>
                  {moment(member.time_last_login).format('DD-MM-YYYY HH:mm:ss')}
                </TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.ip_login}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.ip_register}</TableCell>
                <TableCell style={{ paddingLeft: 60, paddingRight: 60, whiteSpace: 'nowrap' }}>{member.balance}</TableCell>
                <TableCell style={{ display: 'flex' }}>
                  <Button variant="contained" style={{ margin: 5, whiteSpace: 'nowrap' }} onClick={() => handleOpenDialog(member, 'edit')}>
                    Sửa đổi
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 5, whiteSpace: 'nowrap' }}
                    onClick={() => handleOpenDialog(member, 'resetPassword')}
                  >
                    Cài lại mật khẩu
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 5, whiteSpace: 'nowrap' }}
                    onClick={() => handleOpenDialog(member, 'resetFundPassword')}
                  >
                    Cài lại mật khẩu quỹ
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 5, whiteSpace: 'nowrap' }}
                    onClick={() => handleOpenDialog(member, 'updateBalance')}
                  >
                    Cập nhật số dư
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 5, whiteSpace: 'nowrap' }}
                    onClick={() => handleOpenDialog(member, 'delete')}
                  >
                    Xoá thành viên
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="dialog-title">
        {/* <DialogTitle id="dialog-title">{dialogType}</DialogTitle> */}
        <DialogContent fullWidth>
          <DialogContentText>{selectedMember && renderDialogContent()}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MemberManagement;
