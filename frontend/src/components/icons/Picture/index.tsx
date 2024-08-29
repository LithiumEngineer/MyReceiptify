import { FC } from "react";

interface PictureProps {
    className: string;
}

const Picture: FC<PictureProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className={className}
    >
        <path
            d="M11.36 60h41.28A7.36 7.36 0 0 0 60 52.64V11.36A7.36 7.36 0 0 0 52.64 4H11.36A7.36 7.36 0 0 0 4 11.36v41.28A7.36 7.36 0 0 0 11.36 60zM18 12a6 6 0 1 1-6 6 6 6 0 0 1 6-6zM9.34 46.74l20.18-20.25a3.51 3.51 0 0 1 5 0l8.78 8.81a2.62 2.62 0 0 1 0 3.71l-4.71 4.71a2 2 0 0 0 .26 3.07 2.09 2.09 0 0 0 2.67-.3L48 40l6.31-6.3a1 1 0 0 1 1.72.71v16.83A4.67 4.67 0 0 1 51.37 56H14.16A6.16 6.16 0 0 1 8 50a5.16 5.16 0 0 1 1.34-3.26z"
            style={{ fill: "#0072ff" }}
            data-name="Layer 2"
        />
    </svg>
);

export default Picture;
