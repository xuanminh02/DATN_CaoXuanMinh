import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
// import { NumericFormat } from 'react-number-format';

// project import
// import Dot from 'components/@extended/Dot';
import { useEffect, useState } from 'react';
import get_all_result_bet from 'api/get/get_all_result_bet';
import moment from 'moment';
import { RotatingLines } from 'react-loader-spinner';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Pagination } from '@mui/material';
import numberWithCommas from 'utils/numberSeparator';
import get_all_result_session from 'api/get/get_all_result_session';
import update_result_session from 'api/put/update_result_session';
import swal from 'sweetalert';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Số kỳ'
  },
  {
    id: 'time_created',
    align: 'left',
    disablePadding: true,
    label: 'Thời gian bắt đầu'
  },
  {
    id: 'time_updated',
    align: 'center',
    disablePadding: false,
    label: 'Thời gian kết thúc'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: 'Trạng thái'
  },
  {
    id: 'time_end',
    align: 'center',
    disablePadding: false,
    label: 'Thời gian mở thưởng'
  },
  {
    id: 'result_prize',
    align: 'center',
    disablePadding: false,
    label: 'Kết quả mở thưởng'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ textTransform: 'none', fontSize: 14 }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus(data) {
  let bet = data?.bet;
  let totalResultBet = parseInt(data?.result?.split('')[0]) + parseInt(data?.result?.split('')[1]);
  if (data?.result === null) {
    return (
      <RotatingLines
        visible={true}
        height="40"
        width="40"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }
  if ((totalResultBet <= 10 && bet == 1) || (totalResultBet > 10 && bet == 2)) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{'Thắng'}</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{'Thua'}</Typography>
      </Stack>
    );
  }
}

const renderStatus = (row) => {
  const formatTime = moment(new Date(row.time_created));
  const newTime = formatTime.valueOf();
  const currentTime = moment(new Date()).valueOf();
  if (newTime < currentTime) {
    return <div style={{ color: '#555555', cursor: 'pointer' }}>Đã mở thưởng</div>;
  } else {
    return <div style={{ color: '#2e89ff', cursor: 'pointer' }}>Đợi mở thưởng</div>;
  }
};

const renderTimePrize = (row) => {
  const formatTime = moment(new Date(row.time_created));
  const newTime = formatTime.subtract(3, 'minutes');
  const formatedNewTime = newTime.format('YYYY-MM-DD HH:mm:ss');
  return <div>{formatedNewTime}</div>;
};

function ResultBet(data) {
  const [open, setOpen] = useState(false);
  return (
    <div className="c-flex-center" style={{ gap: 10 }}>
      {data?.bet === 1 && 'Xỉu'}
      {data?.bet === 2 && 'Tài'}
      {data?.bet === 0 && 'Không xác định'}
    </div>
  );
}

const RenderResult = ({ row }) => {
  const [open, setOpen] = useState(false);
  const formatTime = moment(new Date(row.time_created));
  const newTime = formatTime.valueOf();
  const currentTime = moment(new Date()).valueOf();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (row) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="c-flex-center" style={{ gap: 5 }}>
          {row?.result?.split('')?.map((item, key) => (
            <div
              key={key}
              style={{
                padding: 5,
                borderRadius: 5,
                border: '2px solid #2e89ff',
                fontWeight: 600,
                width: 28,
                height: 28,
                color: '#2e89ff',
                backgroundColor: 'rgb(185 216 255)'
              }}
              className="c-flex-center"
            >
              {item}
            </div>
          ))}
        </div>
        {newTime < currentTime ? (
          <div style={{ color: '#555555', borderRadius: 5, background: '#d8d8d8', paddingLeft: 5, paddingRight: 5, cursor: 'pointer' }}>
            Đã mở thưởng
          </div>
        ) : (
          <div
            onClick={handleOpen}
            style={{ color: '#2e89ff', borderRadius: 5, background: '#c4deff', paddingLeft: 5, paddingRight: 5, cursor: 'pointer' }}
          >
            Thiết lập lại từ đầu
          </div>
        )}
        <NumberSelectionDialog open={open} onClose={handleClose} {...row} />
      </div>
    );
  } else {
    return <div className="c-flex-center">Đang chờ kết quả</div>;
  }
};

const renderTimeCreated = (time) => {
  return <div>{moment(time).format('DD-MM-YYYY HH:mm:ss')}</div>;
};

const renderSessionId = (sessionId) => {
  if (sessionId) {
    return <div>{sessionId}</div>;
  } else {
    return <div>{parseInt(sessionId) + parseInt(1)}</div>;
  }
};

const renderSession = (session) => {
  return (
    <div>
      {moment(session.time_created).format('YYYYMMDD')}-{session.session_id}
    </div>
  );
};

const renderTimeStart = (time) => {
  const formatTime = moment(new Date(time.time_created));
  const newTime = formatTime.subtract(3, 'minutes');
  const formatedNewTime = newTime.format('YYYY-MM-DD HH:mm:ss');
  return <div>{formatedNewTime}</div>;
};

const renderTimeEnd = (time) => {
  // const formatTime = moment(new Date(time.time_created));
  // const newTime = formatTime.add(3, 'minutes');
  // const formatedNewTime = newTime.format('YYYY-MM-DD HH:mm:ss');
  // return <div>{formatedNewTime}</div>;
  return <div>{moment(new Date(time.time_created)).format('YYYY-MM-DD HH:mm:ss')}</div>;
};

// ==============================|| ORDER TABLE ||============================== //

export default function SessionTable(props) {
  const rowsPerPage = 10;
  const order = 'asc';
  const orderBy = 'tracking_no';
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_all_result_session({ page: page });
        setRows(result?.data);
        setTotalPages(result?.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    // Gọi fetchData lần đầu tiên
    fetchData();

    // Thiết lập một interval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, [props?.current?.id, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderSessionId = (sessionId) => {
    if (sessionId) {
      return <div>{sessionId}</div>;
    } else {
      return <div>{parseInt(props?.current?.id) + parseInt(1)}</div>;
    }
  };

  function renderMoney(money) {
    return numberWithCommas(money) + ' VNĐ';
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {rowsPerPage > 0 &&
              rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={index}>
                    <TableCell component="th" id={labelId} scope="row">
                      <Link> {renderSession(row)}</Link>
                    </TableCell>
                    <TableCell>{renderTimeStart(row)}</TableCell>
                    <TableCell align="center">{renderTimeEnd(row)}</TableCell>
                    <TableCell align="center">{renderStatus(row)}</TableCell>
                    <TableCell align="center">{renderTimePrize(row)}</TableCell>
                    <TableCell align="right">
                      <RenderResult row={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        component="div"
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="large"
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}

const NumberSelectionDialog = ({ open, onClose, result, id }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([
    result?.split('')?.[0],
    result?.split('')?.[1],
    result?.split('')?.[2],
    result?.split('')?.[3],
    result?.split('')?.[4]
  ]);
  const [currentSelectionIndex, setCurrentSelectionIndex] = useState(null);

  useEffect(() => {
    if (open) {
      setCurrentSelectionIndex(0);
    }
  }, [open]);

  const handleNumberClick = (number) => {
    if (currentSelectionIndex !== null) {
      const updatedNumbers = [...selectedNumbers];
      updatedNumbers[currentSelectionIndex] = number;
      setSelectedNumbers(updatedNumbers);

      // Move to the next selection index
      if (currentSelectionIndex < selectedNumbers.length - 1) {
        setCurrentSelectionIndex(currentSelectionIndex + 1);
      } else {
        setCurrentSelectionIndex(null); // Reset selection index if at the end
      }
    }
  };

  const handleSequenceClick = (index) => {
    setCurrentSelectionIndex(index);
  };

  const handleConfirm = async () => {
    try {
      const result = await update_result_session({ session_id: id, result: selectedNumbers?.toString()?.replaceAll(',', '') });
      swal('Thông báo', result?.message, 'success');
    } catch (error) {
      swal('Thông báo', error?.response?.data?.message, 'success');
    }
    console.log('Selected Numbers:', selectedNumbers);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h4">Thiết lập lại từ đầu</DialogTitle>
      <DialogContent>
        <Typography variant="h3" mb={2}>
          Kết quả mở thưởng
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {selectedNumbers.map((num, index) => (
            <Grid xs={2.4} item key={index}>
              <Box
                onClick={() => handleSequenceClick(index)}
                sx={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 1,
                  borderColor: 'grey.500',
                  backgroundColor: index === currentSelectionIndex ? 'grey.300' : 'white',
                  cursor: 'pointer'
                }}
              >
                {num !== null ? num : '?'}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Vui lòng chọn
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <Grid xs={2.4} item key={num}>
              <Box
                onClick={() => handleNumberClick(num)}
                sx={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 1,
                  borderColor: 'grey.500',
                  cursor: 'pointer',
                  backgroundColor: 'white'
                }}
              >
                {num}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy bỏ</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary" disabled={selectedNumbers.includes(null)}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
