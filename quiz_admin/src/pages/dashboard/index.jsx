// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
// import MonthlyBarChart from './MonthlyBarChart';
// import ReportAreaChart from './ReportAreaChart';
// import UniqueVisitorCard from './UniqueVisitorCard';
// import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import padNumberWithZero from 'utils/padNumberWithZero';
import { useEffect, useState } from 'react';
import { useSocket } from 'context/SocketContext';
import adjust_result from 'api/post/adjust_result';
import swal from 'sweetalert';
import get_current_result_session from 'api/get/get_current_result_session';
import Timer from 'components/Timer';
import SessionTable from './SessionTable';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const socket = useSocket();
  const [countdown, setCountdown] = useState();
  const [current, setCurrent] = useState();
  const [result, setResult] = useState('000000');
  const [val1, setVal1] = useState();
  const [val2, setVal2] = useState();
  const [val3, setVal3] = useState();
  const [val4, setVal4] = useState();
  const [val5, setVal5] = useState();

  const getCurrentResultSession = async () => {
    const result = await get_current_result_session();
    setResult(result?.data?.result);
    setCurrent(result?.data);
  };

  useEffect(() => {
    getCurrentResultSession();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('resultNumbers', (data) => {
        setCountdown(data);
      });

      return () => {
        socket.off('resultNumbers');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('result', (data) => {
        setVal1('');
        setVal2('');
        setVal3('');
        setVal4('');
        setVal5('');
        getCurrentResultSession();
        setResult(data.result);
        console.log(data)
      });
    }
  }, [socket]);

  const renderResult = () => {
    if (result) {
      return (
        <>
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
        </>
      );
    }
  };

  const handleAdjustResult = async () => {
    const data = {
      val1,
      val2,
      val3,
      val4,
      val5,
      session_id: parseInt(current.id) + parseInt(1)
    };
    try {
      const result = await adjust_result(data);
      if (result?.ok === true) {
        swal('Thông báo', 'Đã chỉnh kết quả thành công', 'success');
      }
      console.log(result);
    } catch (error) {
      swal('Thông báo', 'Lỗi máy chủ', 'error');
      console.log(error);
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Phiên hiện tại: {current?.session_id || ''}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={12} lg={12}>
        <div style={{}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10
            }}
          >
            {renderResult()}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Phiên kế tiếp: {parseInt(current?.session_id) + parseInt(1) || ''}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Thời gian đến phiên kế tiếp </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={12} lg={12}>
        <Timer countdown={countdown} />
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Chỉnh kết quả phiên kế tiếp</Typography>
      </Grid>
      <Grid item xs={12}>
        <div className="c-flex-center" style={{ gap: 10 }}>
          <div
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
            <input
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              maxLength={1}
              type="text"
              style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
            />
          </div>
          <div
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
            <input
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              maxLength={1}
              type="text"
              style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
            />
          </div>
          <div
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
            <input
              value={val3}
              onChange={(e) => setVal3(e.target.value)}
              maxLength={1}
              type="text"
              style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
            />
          </div>
          <div
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
            <input
              value={val4}
              onChange={(e) => setVal4(e.target.value)}
              maxLength={1}
              type="text"
              style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
            />
          </div>
          <div
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
            <input
              maxLength={1}
              value={val5}
              onChange={(e) => setVal5(e.target.value)}
              type="text"
              style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: 'center' }}
            />
          </div>
        </div>
        <div className="c-flex-center" style={{ marginTop: 12 }}>
          <Button onClick={handleAdjustResult} variant="contained">
            Chỉnh
          </Button>
        </div>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid> */}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid> */}
    </Grid>
  );
}
