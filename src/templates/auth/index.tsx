"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from "./auth.module.scss";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ROUTES_DASHBOARD } from "@/enums/routes";
import { LOCALSTORAGE_KEYS } from "@/enums/localstorage-keys";
import axiosInstance from "@/libs/axios";
import { useLayoutEffect } from "react";

const phoneSchema = z.object({
  phone: z
    .string()
    .startsWith("09", "Phone number must start with 09")
    .length(11, "Phone number must be exactly 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

type PhoneForm = z.infer<typeof phoneSchema>;

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useLocalStorage<ApiTypes.userData | "">(
    LOCALSTORAGE_KEYS.ME,
    ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = async (data: PhoneForm) => {
    try {
      const res = await axiosInstance.get<{
        results: ApiTypes.userData[];
        info: ApiTypes.userResponseInfo;
      }>("/api/?results=1&nat=us");
      const userData = res.data.results[0];
      setUserData(userData);
      router.push(ROUTES_DASHBOARD.BASE);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (userData && typeof userData === "object") {
      router.replace(ROUTES_DASHBOARD.BASE);
    }
  }, [userData, router]);

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          label="Phone Number"
          id="phone"
          {...register("phone")}
          error={errors.phone?.message}
          className={styles.input}
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          disabled={isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
