export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
}) {

  if (!isOpen || !user)
    return null;

  return (
    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-white
        rounded-2xl
        w-full
        max-w-lg
        p-6
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            User Details
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div>
            <p className="text-slate-500">
              Name
            </p>

            <p className="font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Address
            </p>

            <p className="font-medium">
              {user.address}
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Role
            </p>

            <p className="font-medium">
              {user.role}
            </p>
          </div>

          {user.role ===
            "STORE_OWNER" && (
            <>
              <div>
                <p className="text-slate-500">
                  Stores Managed
                </p>

                <p className="font-medium">
                  {
                    user.storesManaged
                  }
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Average Rating
                </p>

                <p className="font-medium">
                  {
                    user.averageRating
                  }
                </p>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}