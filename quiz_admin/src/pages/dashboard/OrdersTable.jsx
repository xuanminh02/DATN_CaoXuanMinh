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
import { Pagination } from '@mui/material';
import numberWithCommas from 'utils/numberSeparator';

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
    id: 'account',
    align: 'left',
    disablePadding: false,
    label: 'Tài khoản'
  },
  {
    id: 'username',
    align: 'left',
    disablePadding: true,
    label: 'Tên người dùng'
  },
  {
    id: 'fat',
    align: 'center',
    disablePadding: false,
    label: 'Kết quả cược'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Tình trạng'
  },
  {
    id: 'result',
    align: 'center',
    disablePadding: false,
    label: 'Kết quả phiên'
  },
  {
    id: 'betMoney',
    align: 'center',
    disablePadding: false,
    label: 'Số tiền cược'
  },
  {
    id: 'time_created',
    align: 'center',
    disablePadding: false,
    label: 'Thời gian đặt cược'
  },
  {
    id: 'session_id',
    align: 'center',
    disablePadding: false,
    label: 'Mã phiên'
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
  if ((totalResultBet <= 10 && bet == 2) || (totalResultBet > 10 && bet == 1)) {
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

function ResultBet(data) {
  return (
    <div className="c-flex-center" style={{ gap: 10 }}>
      {data?.bet === 1 && 'Nhập'}
      {data?.bet === 2 && 'Xuất'}
      {data?.bet === 0 && 'Không xác định'}
    </div>
  );
}

const renderResult = (result) => {
  if (result) {
    return (
      <div className="c-flex-center" style={{ gap: 10 }}>
        {result?.split('')?.map((item, key) => (
          <div
            key={key}
            style={{
              padding: 10,
              borderRadius: '50%',
              border: '2px solid #2e89ff',
              fontWeight: 600,
              width: 40,
              height: 40
            }}
            className="c-flex-center"
          >
            {item}
          </div>
        ))}
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

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable(props) {
  const rowsPerPage = 10;
  const order = 'asc';
  const orderBy = 'tracking_no';
  const [rows, setRows] = useState([]);
  const { page, setPage } = props;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_all_result_bet({ page: page });
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
                      <Link color="secondary"> {row.account ? row.account : 'Tài khoản người dùng đã bị xoá'}</Link>
                    </TableCell>
                    <TableCell>{row.username ? row.username : 'Tài khoản người dùng đã bị xoá'}</TableCell>
                    <TableCell align="right">
                      <ResultBet {...row} />
                    </TableCell>
                    <TableCell>
                      <OrderStatus {...row} />
                    </TableCell>
                    <TableCell align="right">{renderResult(row.result)}</TableCell>
                    <TableCell align="right">{renderMoney(row.betMoney)}</TableCell>
                    <TableCell align="right">{renderTimeCreated(row.time_created)}</TableCell>
                    <TableCell align="right">{renderSessionId(row?.session_id)}</TableCell>
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

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
