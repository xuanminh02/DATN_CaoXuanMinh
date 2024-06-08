import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// project import
import MainCard from 'components/MainCard';
import get_transaction_deposit from 'api/get/get_transaction_deposit';
import moment from 'moment';
import numberWithCommas from 'utils/numberSeparator';
import approve_deposit from 'api/put/approve_deposit';
import swal from 'sweetalert';
import reject_deposit from 'api/put/reject_deposit';
import delete_deposit from 'api/delete/delete_deposit';

// Table with pagination and actions
function PaginatedTable({ data, columns, actions, page, setPage, totalPage }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="paginated table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.render ? column.render(row[column.field]) : row[column.field]}</TableCell>
                ))}
                <TableCell>
                  {row.status === 0 && (
                    <>
                      {actions.map((action) => (
                        <Button key={action.label} onClick={() => action.handler(row)}>
                          {action.label}
                        </Button>
                      ))}
                    </>
                  )}
                  {row.status === 1 && (
                    <>
                      {actions
                        ?.filter((item) => item.type === 3)
                        .map((action) => (
                          <Button key={action.label} onClick={() => action.handler(row)}>
                            {action.label}
                          </Button>
                        ))}
                    </>
                  )}
                  {row.status === 2 && (
                    <>
                      {actions
                        ?.filter((item) => item.type === 3)
                        .map((action) => (
                          <Button key={action.label} onClick={() => action.handler(row)}>
                            {action.label}
                          </Button>
                        ))}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ margin: '12px 0', display: 'flex', width: '100%', flexDirection: 'row-reverse' }}>
          <Stack spacing={2}>
            <Pagination color="primary" count={totalPage} onChange={handleChangePage} />
          </Stack>
        </div>
      </TableContainer>
    </>
  );
}

// ============================|| COMPONENT - TRANSACTION HISTORY ||============================ //

export default function TransactionDeposit() {
  const theme = useTheme();

  const depositColumns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'account',
      headerName: 'Tên tài khoản',
      render: (value) => {
        if (value === null) {
          return 'Tài khoản người dùng đã xoá';
        }
        return value;
      }
    },
    {
      field: 'username',
      headerName: 'Tên người dùng',
      render: (value) => {
        if (value === null) {
          return 'Tài khoản người dùng đã xoá';
        }
        return value;
      }
    },
    { field: 'amount', headerName: 'Số tiền nạp', render: (value) => <div>{numberWithCommas(parseInt(value) * 1000)} VNĐ</div> },
    { field: 'note', headerName: 'Ghi chú' },
    { field: 'name', headerName: 'Tên tài khoản ngân hàng nạp tiền' },
    { field: 'time_created', headerName: 'Thời gian tạo', render: (value) => <div>{moment(value).format('DD-MM-YYYY HH:mm:ss')}</div> },
    {
      field: 'status',
      headerName: 'Trạng thái',
      render: (value) => (
        <div>
          {value === 0 && <div>Chưa xác nhận</div>}
          {value === 1 && <div>Đã duyệt yêu cầu</div>}
          {value === 2 && <div>Đã từ chối yêu cầu</div>}
        </div>
      )
    },
    { field: 'ip', headerName: 'IP' }
  ];

  const [depositData, setDepositData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [change, setChange] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const itemPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_transaction_deposit({
          page: currentPage,
          limit: itemPage,
          startDate: startDate.startOf('day').format(),
          endDate: endDate.endOf('day').format()
        });
        setDepositData(result?.data);
        setTotalPage(result?.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, [currentPage, change, startDate, endDate]);

  const handleApprove = async (row) => {
    const data = { ...row, status: 1 };
    try {
      swal('Thông báo', 'Bạn có chắc muốn duyệt giao dịch này ?', {
        buttons: {
          ok: 'Ok',
          cancel: 'Huỷ'
        }
      }).then(async (value) => {
        if (value === 'ok') {
          await approve_deposit(data);
          swal('Thông báo', 'Đã duyệt thành công', 'success');
          setChange((prev) => !prev);
        }
      });
    } catch (error) {
      swal('Thông báo', 'Có lỗi bất ngờ xảy ra', 'error');
    }
  };

  const handleDelete = (row) => {
    const data = { ...row, status: 1 };
    try {
      swal('Thông báo', 'Bạn có chắc muốn xoá giao dịch này? Điều này không thể khôi phục', {
        buttons: {
          ok: 'Ok',
          cancel: 'Huỷ'
        }
      }).then(async (value) => {
        if (value === 'ok') {
          await delete_deposit(data);
          swal('Thông báo', 'Đã xoá giao dịch thành công', 'success');
          setChange((prev) => !prev);
        }
      });
    } catch (error) {
      swal('Thông báo', 'Có lỗi bất ngờ xảy ra', 'error');
    }
  };

  const handleReject = (row) => {
    const data = { ...row, status: 1 };
    try {
      swal('Thông báo', 'Bạn có chắc muốn từ chối giao dịch này ?', {
        buttons: {
          ok: 'Ok',
          cancel: 'Huỷ'
        }
      }).then(async (value) => {
        if (value === 'ok') {
          await reject_deposit(data);
          swal('Thông báo', 'Đã từ chối thành công', 'success');
          setChange((prev) => !prev);
        }
      });
    } catch (error) {
      swal('Thông báo', 'Có lỗi bất ngờ xảy ra', 'error');
    }
  };

  const actions = [
    { label: 'Duyệt', handler: handleApprove, type: 1 },
    { label: 'Từ chối', handler: handleReject, type: 2 },
    { label: 'Xoá', handler: handleDelete, type: 3 }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Danh sách nạp tiền">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack direction="row" spacing={2} mb={2}>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button
                variant="contained"
                onClick={() => {
                  setStartDate(moment().subtract(1, 'days').startOf('day'));
                  setEndDate(moment());
                  // setEndDate(moment().format());
                }}
              >
                1 ngày
              </Button>
              <Button
                onClick={() => {
                  setStartDate(moment().subtract(3, 'days').startOf('day'));
                  setEndDate(moment());
                  // setEndDate(moment().format());
                }}
                variant="contained"
              >
                3 ngày
              </Button>
              <Button
                onClick={() => {
                  setStartDate(moment().subtract(5, 'days').startOf('day'));
                  setEndDate(moment());
                  // setEndDate(moment().format());
                }}
                variant="contained"
              >
                5 ngày
              </Button>
              <Button
                onClick={() => {
                  setStartDate(moment().subtract(7, 'days').startOf('day'));
                  setEndDate(moment());
                  // setEndDate(moment().format());
                }}
                variant="contained"
              >
                7 ngày
              </Button>
              <Stack direction="row" spacing={2} mb={2}></Stack>
            </Stack>
          </LocalizationProvider>
          <PaginatedTable
            data={depositData}
            columns={depositColumns}
            actions={actions}
            page={currentPage}
            setPage={setCurrentPage}
            totalPage={totalPage}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
