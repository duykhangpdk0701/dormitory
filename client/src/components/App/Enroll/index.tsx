import React, { FC } from "react";
import {
  Container,
  Grid,
  TextField,
  FormHelperText,
  FormLabel,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IEnrollParams } from "@/pages/enroll";
import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { LazyLoadImage } from "react-lazy-load-image-component";
import enrollImg from "@/assets/enroll/enroll.jpg";
import Dropzone from "@/components/Dropzone";
import IRoomType from "@/interfaces/RoomTypet";
import IPriority from "@/interfaces/Priority";

interface IEnroll {
  control: Control<IEnrollParams, any>;
  handleSubmit: UseFormHandleSubmit<IEnrollParams>;
  onSubmit: SubmitHandler<IEnrollParams>;
  isLoading: boolean;
  errorResMessage: string;
  roomTypeList?: IRoomType[];
  isLoadingRoomTypeList: boolean;
  priorityList?: IPriority[];
  isLoadingPriority: boolean;
}

const Enroll: FC<IEnroll> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    roomTypeList,
    isLoadingRoomTypeList,
    priorityList,
    isLoadingPriority,
  } = props;

  return (
    <div className="pt-4">
      <Container>
        <h1 className="mb-10">Đăng ký ở ký túc xá</h1>
      </Container>
      <Container className="bg-white min-h-[100vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LazyLoadImage
                className="w-full"
                src={enrollImg.src}
                alt="sgu dormitory enroll"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3} className="mb-4">
                <Grid item xs={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Tên"
                          placeholder="Văn A"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Họ"
                          placeholder="Nguyễn"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="studentId"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Mã số sinh viên(mssv)"
                          placeholder="311xxxxxxx"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Email"
                          placeholder="abc@gmail.com"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          fullWidth
                          error={invalid}
                          label="Số Điện thoại"
                          placeholder="0123456789"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <DatePicker
                          {...field}
                          label="Ngày sinh"
                          slotProps={{ textField: { fullWidth: true } }}
                        />

                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="province"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Tỉnh"
                          placeholder="TP.Hồ Chí Minh"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="district"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Quận"
                          placeholder="Tân Phú"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <TextField
                          {...field}
                          error={invalid}
                          fullWidth
                          label="Đường"
                          placeholder="99 Văn Cao"
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="roomTypeId"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <>
                        <FormControl fullWidth>
                          <InputLabel id="roomt-type">Loại phòng</InputLabel>
                          <Select
                            {...field}
                            id="roomt-type"
                            fullWidth
                            error={invalid}
                            disabled={isLoadingRoomTypeList}
                            label="Loại phòng"
                          >
                            {roomTypeList?.map((item) => (
                              <MenuItem value={item._id}>{item.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="roomTypeId"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <>
                        <FormControl fullWidth>
                          <InputLabel id="roomt-type">Ưu tiên</InputLabel>
                          <Select
                            {...field}
                            id="roomt-type"
                            fullWidth
                            error={invalid}
                            disabled={isLoadingPriority}
                            label="Ưu tiên"
                          >
                            {priorityList?.map((item) => (
                              <MenuItem value={item._id}>{item.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="images"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <>
                        <FormLabel className="font-bold text-base mb-4 block">
                          Hình ảnh:
                        </FormLabel>
                        <Dropzone
                          onChange={field.onChange}
                          multiple={true}
                          error={invalid}
                        />
                        <FormHelperText error={invalid}>
                          {error?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    fullWidth
                    size="large"
                  >
                    Đăng ký
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Enroll;
