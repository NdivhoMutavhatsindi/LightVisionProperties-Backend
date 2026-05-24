import { prisma } from "../config/prisma.js";
import { Prisma } from "@prisma/client";

export const PropertyRepository = {
  findAll(filter = {}) {
    return prisma.properties.findMany({ where: filter, orderBy: { created_at: "desc" }, include: { property_images: true } });
  },

  findById(propertyId) {
    return prisma.properties.findUnique({ where: { property_id: propertyId }, include: { property_images: true } });
  },

  create(data) {
    const { images = [], ...props } = data;
    return prisma.properties.create({
      data: {
        ...props,
        bedrooms: Number(props.bedrooms),
        bathrooms: Number(props.bathrooms),
        price: new Prisma.Decimal(String(props.price)),
        property_images: {
          create: images.map((image) => ({
            image_url: image.image_url,
            is_primary: image.is_primary ?? false,
            display_order: image.display_order ?? 0,
          })),
        },
      },
      include: { property_images: true },
    });
  },

  update(propertyId, data) {
    return prisma.properties.update({ where: { property_id: propertyId }, data });
  },

  delete(propertyId) {
    return prisma.properties.delete({ where: { property_id: propertyId } });
  },
};
